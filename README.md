# iot-car-webapp

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Angelmmc/iot-car-webapp.svg)](https://github.com/Angelmmc/iot-car-webapp/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Angelmmc/iot-car-webapp.svg)](https://github.com/Angelmmc/iot-car-webapp/issues)

## About 
This project is the backend system for an IoT-enabled car, providing a RESTful API for real-time vehicle monitoring and control. It also serves an integrated web frontend, allowing users to interact with the vehicle remotely through a browser. Designed to support remote commands, actions history.

## Built with
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />

##  Getting Started

### Prerequisites
- Git
- Python 3.x

###  Installation

1. Clone the repository
```bash
git clone https://github.com/Angelmmc/iot-car-webapp.git
```
2. Navigate to the project folder
```bash
cd iot-car-webapp
```

3. Create and activate a virtual enviroment
```bash
python -m venv venv
venv\Scripts\activate
```

4. Install dependencies
```bash
pip install -r requirements.txt
```

5. Navigate to the back-end folder
```bash
cd backend
```

6. Run the app
```bash
python main.py
```
## Usage

In order to use the app, first write a name on the text input.

Main options
- **Control Panel**: Use directional buttons to move the car — forward, backward, left, and right — at different angles, and stop when needed.
- **Status Monitor**: View real-time data including executed actions, timestamps, and the user who initiated them. The data refreshes automatically every 5 seconds, but you can tap the floating button to refresh it manually.
- **Modify Query Button**: Toggle the Status Monitor between showing only the most recent action or the last ten actions.
- - **Status image**: Displays the most recent action the car is performing in real time.

## Screenshot

<img src="https://github.com/Angelmmc/iot-car-webapp/blob/master/frontEnd/images/page_screen.png" alt="App Screen" height="400"/>

## License
Distributed under the MIT License. See LICENSE.txt for more information.

## Related

Check out the related repositories for my iot-car project.

[![iot-car-arduino](https://img.shields.io/badge/iot__car-arduino-D68FD6?logo=github)](https://github.com/Angelmmc/iot-car-arduino)
[![iot-car-frontend-mobile](https://img.shields.io/badge/iot__car-frontend--mobile-E76F51?logo=github)](https://github.com/Angelmmc/iot-car-frontend-mobile)

