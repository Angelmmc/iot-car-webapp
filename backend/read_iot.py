# read_iot.py
from flask import jsonify
from database import get_connection

def read_iot():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM tableIoTCarStatus"
            cursor.execute(sql)
            result = cursor.fetchall()
        return jsonify(result), 200
    finally:
        connection.close()

def get_last_record():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM tableIoTCarStatus ORDER BY id DESC LIMIT 1"
            cursor.execute(sql)
            result = cursor.fetchone()  # Solo recuperamos un registro
        return jsonify(result), 200
    finally:
        connection.close()

def get_last_10():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM tableIoTCarStatus ORDER BY id DESC LIMIT 10"
            cursor.execute(sql)
            result = cursor.fetchall()  # Solo recuperamos un registro
        return jsonify(result), 200
    finally:
        connection.close()