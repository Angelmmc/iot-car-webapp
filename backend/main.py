# main.py
from flask import Flask, send_from_directory
from create_iot import create_iot
from read_iot import read_iot, get_last_record,get_last_10
from update_iot import update_iot
from delete_iot import delete_iot
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend', static_url_path='/')

CORS(app)

# Ruta para servir el archivo HTML (la página principal)
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/iot', methods=['POST'])
def create():
    return create_iot()

@app.route('/iot', methods=['GET'])
def read():
    return read_iot()

@app.route('/iot/last', methods=['GET'])
def read_last():
    return get_last_record()

@app.route('/iot/10', methods=['GET'])
def read_last_10():
    return get_last_10()

@app.route('/iot/<int:id>', methods=['PUT'])
def update_iot_route(id):
    return update_iot(id)

@app.route('/iot/<int:record_id>', methods=['DELETE'])
def delete(record_id):
    return delete_iot(record_id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)