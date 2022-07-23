const cors = require("cors");
const axios = require("axios");
const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
const port = 4000;

app.use( express.json() );
app.use( cors() );

const posts = {};

app.get('/posts', (req, res) => {
    res.send( posts );
});

app.post('/posts', async (req, res) => {

    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    
    const data = { id, title }; 

    posts[id] = data;

    // Enviamos Datos a nuestro EVENTBUS
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data,
    }).catch( (err) => { console.log( err.message ); });

    res.status(201).send( posts[id] );

});

// Endpoint para nuestro EVENTBUS
app.post('/events', (req, res) => {
    console.log("Event Recieved: ", req.body.type);

    res.send({});
});

app.listen( port, () => {
    console.log("Server is running successfully on port :", port);
});