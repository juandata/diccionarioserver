const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname, '/build');
app.use(express.static(publicPath));
//Servidor estático que sirve el build generado en desarrollo para producción en el servidor de glitch
app.use('*', express.static(publicPath + '/index.html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})




