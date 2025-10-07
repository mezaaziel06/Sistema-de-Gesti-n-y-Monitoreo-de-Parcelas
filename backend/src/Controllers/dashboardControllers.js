const axios = require('axios');
const connection = require('../database');


const syncDataFromAPI = async () => {
    try {
        const response = await axios.get('http://moriahmkt.com/iotapp/updated/');
        const { parcelas, sensores } = response.data;


    const insertSensorGeneralQuery = `
        INSERT INTO sensores_generales (humedad, temperatura, lluvia, sol)
        VALUES (?, ?, ?, ?)
    `;
        const sensorGeneralValues = [sensores.humedad, sensores.temperatura, sensores.lluvia, sensores.sol];
        await connection.promise().query(insertSensorGeneralQuery, sensorGeneralValues);
        console.log('Nuevo registro de sensores generales insertado.');


        for (const parcela of parcelas) {

            const [existingParcela] = await connection.promise().query(
                'SELECT id FROM parcelas WHERE nombre = ?',
                [parcela.nombre]
            );

            let parcelaId;
            if (existingParcela.length === 0) {

                const insertParcelaQuery = `
            INSERT INTO parcelas (nombre, ubicacion, responsable, tipo_cultivo, ultimo_riego, latitud, longitud, activo)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `;
                const parcelaValues = [
                    parcela.nombre,
                    parcela.ubicacion,
                    parcela.responsable,
                    parcela.tipo_cultivo,
                    parcela.ultimo_riego,
                    parcela.latitud,
                    parcela.longitud
                ];
                const [result] = await connection.promise().query(insertParcelaQuery, parcelaValues);
                parcelaId = result.insertId;
                console.log(`Parcela "${parcela.nombre}" insertada.`);
            } else {

                parcelaId = existingParcela[0].id;
                const updateParcelaQuery = `
            UPDATE parcelas
            SET ubicacion = ?, responsable = ?, tipo_cultivo = ?, ultimo_riego = ?, latitud = ?, longitud = ?
            WHERE id = ?
        `;
                const parcelaValues = [
                    parcela.ubicacion,
                    parcela.responsable,
                    parcela.tipo_cultivo,
                    parcela.ultimo_riego,
                    parcela.latitud,
                    parcela.longitud,
                    parcelaId
                ];
                await connection.promise().query(updateParcelaQuery, parcelaValues);
                console.log(`Parcela "${parcela.nombre}" actualizada.`);
            }


            const { humedad, temperatura, lluvia, sol } = parcela.sensor;
            const fecha = new Date().toISOString();

            const insertSensorParcelaQuery = `
        INSERT INTO sensores_parcela (parcela_id, humedad, temperatura, lluvia, sol, fecha)
        VALUES (?, ?, ?, ?, ?, ?)
        `;
            const sensorValues = [parcelaId, humedad, temperatura, lluvia, sol, fecha];
            await connection.promise().query(insertSensorParcelaQuery, sensorValues);
            console.log(`Nuevo registro de sensores para la parcela "${parcela.nombre}" insertado.`);
        }

        const [activeParcelasDB] = await connection.promise().query(
            'SELECT id, nombre FROM parcelas WHERE activo = 1'
        );

        const nombresDesdeAPI = new Set(parcelas.map(p => p.nombre));

        for (const parcelaDB of activeParcelasDB) {
            if (!nombresDesdeAPI.has(parcelaDB.nombre)) {
                await connection.promise().query(
                    'UPDATE parcelas SET activo = 0 WHERE id = ?',
                    [parcelaDB.id]
                );
                console.log(`Parcela "${parcelaDB.nombre}" desactivada por ausencia en la API.`);
            }
        }


        return true;
    } catch (error) {
        console.error('Error al sincronizar datos desde la API:', error.message);
        throw new Error('Fallo la sincronización');
    }

};

const getDashboardData = async (req, res) => {
    try {

        await syncDataFromAPI();

        const [parcelas] = await connection.promise().query('SELECT * FROM parcelas WHERE activo = 1');

        const [sensores] = await connection.promise().query('SELECT * FROM sensores_generales ORDER BY id DESC LIMIT 1');

        for (const parcela of parcelas) {
            const [sensoresParcela] = await connection.promise().query(
                'SELECT * FROM sensores_parcela WHERE parcela_id = ? ORDER BY fecha DESC LIMIT 1',
                [parcela.id]
            );
            parcela.sensores = sensoresParcela.length > 0 ? sensoresParcela[0] : null;
        }

        res.status(200).json({
            parcelas,
            sensores: sensores.length > 0 ? sensores[0] : null
        });
    } catch (error) {
        console.error('Error en getDashboardData:', error.message);
        res.status(500).json({ error: 'Error al obtener datos para el dashboard' });
    }
};

const getSensoresGeneralesHistorico = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;

        let query = 'SELECT * FROM sensores_generales';
        const params = [];

        if (fechaInicio && fechaFin) {
            query += ' WHERE fecha BETWEEN ? AND ?';
            params.push(fechaInicio, fechaFin);
        } else if (fechaInicio) {
            query += ' WHERE fecha >= ?';
            params.push(fechaInicio);
        } else if (fechaFin) {
            query += ' WHERE fecha <= ?';
            params.push(fechaFin);
        }

        query += ' ORDER BY fecha DESC';

        const [rows] = await connection.promise().query(query, params);

        res.status(200).json({
            sensores_generales: rows
        });
    } catch (error) {
        console.error('Error al obtener el histórico de sensores generales:', error.message);
        res.status(500).json({ error: 'Error al obtener el histórico' });
    }
};

const getSensoresParcelaHistorico = async (req, res) => {
    const { parcelaId } = req.params;

    try {
        const [historico] = await connection.promise().query(`
        SELECT id, parcela_id, humedad, temperatura, lluvia, sol, fecha
        FROM sensores_parcela
        WHERE parcela_id = ?
        ORDER BY fecha DESC
    `, [parcelaId]);

        if (historico.length === 0) {
            return res.status(404).json({ message: 'No hay registros de sensores para esta parcela.' });
        }

        res.status(200).json({
            sensores_parcela: historico
        });
    } catch (error) {
        console.error('Error al obtener histórico de sensores de parcela:', error.message);
        res.status(500).json({ error: 'Error al obtener el histórico de sensores de parcela' });
    }
};

const desactivarParcela = async (req, res) => {
    const { parcelaId } = req.params;

    try {
        const [existingParcela] = await connection.promise().query(
            'SELECT id FROM parcelas WHERE id = ?',
            [parcelaId]
        );

        if (existingParcela.length === 0) {
            return res.status(404).json({ error: 'Parcela no encontrada' });
        }

        const updateQuery = 'UPDATE parcelas SET activo = 0 WHERE id = ?';
        await connection.promise().query(updateQuery, [parcelaId]);

        res.status(200).json({ message: 'Parcela desactivada correctamente' });
    } catch (error) {
        console.error('Error al desactivar la parcela:', error.message);
        res.status(500).json({ error: 'Error al desactivar la parcela' });
    }
};

const reactivarParcela = async (req, res) => {
    const { parcelaId } = req.params;

    try {
        const [existingParcela] = await connection.promise().query(
            'SELECT id FROM parcelas WHERE id = ?',
            [parcelaId]
        );

        if (existingParcela.length === 0) {
            return res.status(404).json({ error: 'Parcela no encontrada' });
        }

        const updateQuery = 'UPDATE parcelas SET activo = 1 WHERE id = ?';
        await connection.promise().query(updateQuery, [parcelaId]);

        res.status(200).json({ message: 'Parcela reactivada correctamente' });
    } catch (error) {
        console.error('Error al reactivar la parcela:', error.message);
        res.status(500).json({ error: 'Error al reactivar la parcela' });
    }
};

const getParcelas = async (req, res) => {
    try {
        const [parcelas] = await connection.promise().query('SELECT * FROM parcelas');

        res.status(200).json({ parcelas });
    } catch (error) {
        console.error('Error al obtener las parcelas:', error.message);
        res.status(500).json({ error: 'Error al obtener las parcelas' });
    }
};

const eliminarParcela = async (req, res) => {
    const { parcelaId } = req.params;

    try {
        const [existingParcela] = await connection.promise().query(
            'SELECT id, activo FROM parcelas WHERE id = ?',
            [parcelaId]
        );

        if (existingParcela.length === 0) {
            return res.status(404).json({ error: 'Parcela no encontrada' });
        }

        if (existingParcela[0].activo === 1) {
            return res.status(400).json({ error: 'Solo se pueden eliminar parcelas desactivadas' });
        }


        await connection.promise().query(
            'DELETE FROM sensores_parcela WHERE parcela_id = ?',
            [parcelaId]
        );


        await connection.promise().query(
            'DELETE FROM parcelas WHERE id = ?',
            [parcelaId]
        );

        res.status(200).json({ message: 'Parcela eliminada permanentemente' });
    } catch (error) {
        console.error('Error al eliminar la parcela:', error.message);
        res.status(500).json({ error: 'Error al eliminar la parcela' });
    }
};




module.exports = {
    getDashboardData,
    getSensoresGeneralesHistorico,
    getSensoresParcelaHistorico,
    desactivarParcela,
    reactivarParcela,
    getParcelas,
    eliminarParcela
};