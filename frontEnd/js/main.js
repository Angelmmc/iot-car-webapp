const inputText = document.getElementById('inputText');
const buttons = document.querySelectorAll('button');
const imagen = document.getElementById('imagen');

const ip = '54.198.159.79:5000/iot'

let status_test
// Habilitar o deshabilitar los botones según el input

function crearJson(stts, user) {
    // Obtener la IP del cliente usando ipify
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            // Crear el objeto con el estado, la IP y el nombre del usuario
            const iot = {
                status: stts,
                ip_cliente: data.ip,  // IP obtenida
                name: user    // Nombre del usuario
            };

            console.log('Objeto JSON creado: ', iot);

            // Enviar el objeto JSON a la API usando POST
            fetch('http://' + ip, {  // Reemplaza con la URL de tu API
                method: 'POST',                         // Método POST
                headers: {
                    'Content-Type': 'application/json'  // Tipo de contenido JSON
                },
                body: JSON.stringify(iot)               // Convertir el objeto a JSON
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();             // Si la respuesta es exitosa
                    }
                    throw new Error('Error al enviar el JSON');
                })
                .then(data => {
                    console.log('Respuesta de la API:', data); // Manejar la respuesta de la API
                })
                .catch(error => {
                    console.error('Error al enviar el JSON a la API:', error);
                });

        })
        .catch(error => console.error('Error al obtener la IP:', error));
}


let arregloAcciones = [
    ['Girando a la izquierda 90°', 'Izquierda 90°', 'images/carro_izquierda.png'],
    ['Avanzando', 'Avanzar', 'images/carro_avanzar.png'],
    ['Girando a la derecha 90°', 'Derecha 90°', 'images/carro_derecha.png'],
    ['Girando a la izquierda', 'Izquierda', 'images/carro_izquierda.png'],
    ['Deteniendose', 'Deteniendose', 'images/carro.png'],
    ['Girando a la derecha', 'Derecha', 'images/carro_derecha.png'],
    ['Girando a la izquierda 360°', 'Izquierda 360°', 'images/carro_izquierda360.png'],
    ['Retrocediendo', 'Retroceder', 'images/carro_retroceder.png'],
    ['Girando a la izquierda 360°', 'Derecha 360°', 'images/carro_derecha360.png']
];


// Función para manejar los clicks en los botones
function manejarBoton(status) {
    const userName = inputText.value.trim();  // Obtener el valor del input

    // Verificar si el input está vacío antes de proceder
    if (userName === '') {
        alert('Por favor, introduce un valor en el campo de texto.');
        return;
    }

    crearJson(status, userName);  // Llamar a crearJson con el estado y el nombre del usuario

    document.getElementById('texto-boton').textContent = arregloAcciones[status - 1][0];
}

let refreshInterval;
const tablaBody = document.getElementById('tabla-body');
function fetchAndUpdateTable(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            tablaBody.innerHTML = '';  // Limpiamos la tabla antes de llenarla
            let contador = 1;
            // Si data es un objeto (un solo registro), lo convertimos en un array
            const registros = Array.isArray(data) ? data : [data];

            registros.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="table-cell">${registro.id}</td>
                    <td class="table-cell">${registro.name}</td>
                    <td class="table-cell">${registro.ip_cliente}</td>
                    <td class="table-cell">${new Date(registro.date).toLocaleString()}</td>
                    <td class="table-cell">${arregloAcciones[registro.status - 1][1]}</td> 
                    <td class="table-cell">${registro.id_device}</td>
                `;
                tablaBody.appendChild(row);
                if (contador == 1) {
                    imagen.src = arregloAcciones[registro.status - 1][2];
                    status_test = registro.status;  // Guardamos el estado del último registro
                }
                contador++;
            });
        })
        .catch(error => console.error('Error:', error));
}



function startAutoRefresh(url) {
    clearInterval(refreshInterval); // Limpiamos cualquier intervalo previo
    fetchAndUpdateTable(url); // Cargamos la tabla inmediatamente
    refreshInterval = setInterval(() => fetchAndUpdateTable(url), 3000); // Refrescar cada 3 segundos
}

// Eventos para los botones
document.getElementById('boton11').addEventListener('click', () => {
    const apiUrl = 'http://' + ip + '/10'; // Cambia por tu URL
    startAutoRefresh(apiUrl);
});

document.getElementById('boton10').addEventListener('click', () => {
    const apiUrl = 'http://' + ip + '/last'; // Cambia por tu URL
    startAutoRefresh(apiUrl);
});



document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los botones con la clase 'btn-control'
    const buttons = document.querySelectorAll('.btn-control');

    // Recorrer todos los botones y agregarles el evento 'click'
    buttons.forEach((button, index) => {
        button.addEventListener('click', function () {
            manejarBoton(index + 1);  // Pasar el estado correspondiente al botón (1, 2, 3, etc.)
        });
    });
});
