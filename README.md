# web-calculator-server
The backend server for the web calculator, with the bundled frontend application in the 'build' folder.
The server is implemented by Express.js and Socket.Io that used to listen the update from client and broadcast the update to all the connected clients.
# Usage
## Run locally
```
$cd web-calculator-server
$node server.js
```
## Deploy on Heroku
The server with client has been deployed on Heroku. You could visit it here: [https://web-calculator-server.herokuapp.com/](https://web-calculator-server.herokuapp.com/)
