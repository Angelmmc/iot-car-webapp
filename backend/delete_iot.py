# delete_iot.py
from flask import request, jsonify
from database import get_connection

def delete_iot(record_id):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            # Consulta SQL para eliminar el registro con el id proporcionado
            sql = "DELETE FROM tableIoTCarStatus WHERE id = %s"
            cursor.execute(sql, (record_id,))
        connection.commit()

        if cursor.rowcount > 0:
            return jsonify({'message': f'Registro con id {record_id} eliminado exitosamente'}), 200
        else:
            return jsonify({'message': f'No se encontró un registro con id {record_id}'}), 404
    finally:
        connection.close()
