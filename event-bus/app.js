const express = require("express");
const axios = require("axios");

const app = express();
const port = 4005;

app.use( express.json() );

const events = [];

app.post('/events', ( req, res ) => {
    
    const event = req.body;

    events.push( event ); // save all event in array

    axios.post("http://localhost:4000/events", event ).catch((err) => {
        console.log(err.message);
    });    
    axios.post("http://localhost:4001/events", event ).catch((err) => {
        console.log(err.message);
    });    
    axios.post("http://localhost:4002/events", event ).catch((err) => {
        console.log(err.message);
    });
    axios.post("http://localhost:4003/events", event ).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: "OK", msg: "Todo correcto" });

});

app.get('/events', ( req, res ) => {
    res.send( events );
});

app.listen( port, () => {
    console.log("Server Running on port : ", port);
});