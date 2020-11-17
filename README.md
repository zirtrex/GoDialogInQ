# GoDialogInQ 
El presente proyecto forma parte de la presentación para el curso de Integrador 2 de la Universidad Tecnologica del Perú.
El proyecto consiste en la implementación de un chatbot para la captación de clientes.
El proyecto a sido desarrollado usando las siguientes tecnologías y framework:
1. NodeJS
...Express
...Angular
...Fullfilments
2. MySQL
3. Docker
4. Kubernetes
5. Jenkins
6. Dialogflow

# Estructura del proyecto
El proyecto se divide en 4 aplicaciones, 1 base de datos y 1 servidor de integración que se detallan a continuación:
1. Back
...Contiene las API Rest que serán usadas tanto por la aplicación fullfilment (carpeta fullfilment), como por mantenimiento (carpeta fullfilment).
2. Front
...Contiene el chatbot, este se comunica con Dialogflow y responde a las intenciones del usuario
3. Fullfilment
...Contiene los fullfilments responden a los envios de dialogflow y es capaz de responder y guardar la información del usuario.
4. Mantenimiento
...Contiene un CRUD que permite manipular los préstamos y requisitos, a su vez se lista la información de los clientes.
5. Data
...Contiene los scripts y el modelo fisico.
6. Jenkins
...Contiene el Dockerfile necesario para levantar un servidor de aplicación y hacer pruebas correspondientes.

Cada carpeta contiene su propio Dockerfile para ejecutar cada aplicación de forma individual,

# Pasos para ejecutar el proyecto

- Ejecutar npm start
- Ejecutar ngrok http [Puerto Nodejs]
- Ejecutar npm test


