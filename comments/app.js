const cors = require("cors");
const axios = require("axios");
const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
const port = 4001;

app.use( express.json() );
app.use( cors() );

const commentsByPostId = {};

app.get('/posts/:id/comments', ( req, res ) => {

    res.send( commentsByPostId[req.params.id] || [] );

});

app.post('/posts/:id/comments', async ( req, res ) => {

    const { id:bodyId } = req.params;
    const { content } = req.body;

    const commentId = randomBytes(4).toString("hex");
    const status = 'pending'; // Esto es sobre los MODERATORS

    const comments = commentsByPostId[ bodyId ] || [];

    comments.push({ id: commentId , content, status });

    commentsByPostId[ bodyId ] = comments;

    // Enviamos Datos a nuestro EVENTBUS
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: bodyId,
            status,
        }
    }).catch( (err) => { console.log( err.message ); });

    res.status(201).send( comments );

});

// Endpoint para nuestro EVENTBUS
app.post('/events', async (req, res) => {
    console.log("Event Recieved: ", req.body.type);

    const { type, data } = req.body;

    if( type === 'CommentModerated' ) {

        const { id, content, postId, status } = data;
        const comments = commentsByPostId[ postId ];

        const comment = comments.find( d => {
            return d.id == id;
        });

        comment.status = status;

        await axios.post("http://event-bus-srv:4005/events", {
            type: 'CommentUpdated',
            data: {
                id, 
                content,
                postId,
                status,
            }
        });

    }

    res.send({});
});

app.listen( port, () => {
    console.log("Server running on port", port);
});