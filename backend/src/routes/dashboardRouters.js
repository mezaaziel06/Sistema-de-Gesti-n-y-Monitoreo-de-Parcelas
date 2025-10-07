const express = require('express');
const router = express.Router();
const dashboardController = require('../Controllers/dashboardControllers');

// Dashboard principal
router.get('/dashboard', dashboardController.getDashboardData);

// Histórico de sensores generales
router.get('/historico-sensores-generales', dashboardController.getSensoresGeneralesHistorico);

// Histórico de sensores de una parcela
router.get('/historico-sensores-parcela/:parcelaId', dashboardController.getSensoresParcelaHistorico);

// Ruta para desactivar una parcela
router.put('/parcelas/desactivar/:parcelaId', dashboardController.desactivarParcela);

// Ruta para reactivar una parcela
router.put('/parcelas/reactivar/:parcelaId', dashboardController.reactivarParcela);

// Ruta para extraer parcelas
router.get('/parcelas', dashboardController.getParcelas);

// Ruta para eliminar una parcela
router.delete('/parcelas/:parcelaId', dashboardController.eliminarParcela);

module.exports = router;