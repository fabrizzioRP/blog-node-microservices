const axios = require("axios");
const express = require("express");

const app = express();
const port = 4003;

app.use( express.json() );

app.post('/events', async (req, res) => {

    const { type, data } = req.body;

    if( type === 'CommentCreated' ){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status,
            }
        });

    }

    res.send({});

});

app.listen( port, () => {
    console.log("Server runninf on port: ", port);
});