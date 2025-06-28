from flask import request, jsonify
from database import get_connection

def update_iot(id):
    data = request.json
    status = data.get('status')
    ip_client = data.get('ip_cliente')
    name = data.get('name')
    id_device = data.get('id_device')

    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                UPDATE tableIoTCarStatus
                SET status = %s, ip_cliente = %s, name = %s, id_device = %s
                WHERE id = %s
            """
            cursor.execute(sql, (status, ip_client, name, id_device, id))
        connection.commit()
        return jsonify({'message': 'Registro actualizado exitosamente'}), 200
    finally:
        connection.close()
