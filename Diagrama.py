from graphviz import Digraph
import os

# Crear el diagrama ER con estilos
dot = Digraph(comment="Diagrama ER - Sistema de Parcelas con Sensores")
dot.attr(rankdir="LR", size="10")

# Estilos para categorías
style_usuario = {"shape": "box", "style": "filled", "fillcolor": "#AED6F1"}
style_roles = {"shape": "box", "style": "filled", "fillcolor": "#F9E79F"}
style_parcela = {"shape": "box", "style": "filled", "fillcolor": "#ABEBC6"}
style_sensor = {"shape": "box", "style": "filled", "fillcolor": "#F5B7B1"}
style_lectura = {"shape": "box", "style": "filled", "fillcolor": "#D7BDE2"}

# Definición de nodos (entidades)
dot.node("Usuario", "USUARIO\n- id_usuario (PK)\n- nombre\n- correo\n- contrasena_hash\n- fecha_registro", **style_usuario)
dot.node("Rol", "ROL\n- id_rol (PK)\n- nombre_rol", **style_roles)
dot.node("UsuarioRol", "USUARIO_ROL\n- id_usuario (FK)\n- id_rol (FK)", **style_roles)
dot.node("Parcela", "PARCELA\n- id_parcela (PK)\n- nombre\n- ubicacion (JSONB)\n- id_usuario (FK)\n- estado", **style_parcela)
dot.node("Sensor", "SENSOR\n- id_sensor (PK)\n- tipo\n- unidad\n- descripcion\n- id_parcela (FK)", **style_sensor)
dot.node("Lectura", "LECTURA_SENSOR\n- id_lectura (PK)\n- id_sensor (FK)\n- valor\n- timestamp\n- metadata (JSONB)", **style_lectura)

# Relaciones
dot.edge("Usuario", "Parcela", label="1:N")
dot.edge("Usuario", "UsuarioRol", label="1:N")
dot.edge("Rol", "UsuarioRol", label="1:N")
dot.edge("Parcela", "Sensor", label="1:N")
dot.edge("Sensor", "Lectura", label="1:N")

# Renderizar a PNG en la carpeta actual
output_path_colored = "ER_Parcelas_Sensores_Colores"
png_path = dot.render(output_path_colored, format="png", cleanup=True)

print(f"Diagrama generado en: {png_path}")

# Abrir automáticamente en Windows
if os.name == "nt":
    os.startfile(png_path)
