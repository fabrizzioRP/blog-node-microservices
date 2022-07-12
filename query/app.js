const cors = require("cors");
const axios = require("axios");
const express = require("express");

const app  = express();
const port = 4002;

app.use( express.json() );
app.use( cors() );

const posts = {};

const handleEvent = ( type, data ) => {

    // Cuando crea un post
    if( type === 'PostCreated' ) {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    // Cuando crea un comentario en un post
    if( type === 'CommentCreated' ) {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    // Cuando actualiza el status del comentario moderado
    if( type === 'CommentUpdated' ) {
        const { id, postId, content, status } = data;
        
        const post = posts[postId];
        const comment = post.comments.find( (c) => {
            return c.id == id;
        });

        comment.content = content;
        comment.status  = status;
    }
}

// Enviamos nuestros datos de posts
app.get('/posts', ( req, res ) => {
    res.send( posts );
});

// Recibimos de nuestro EVENTBUS
app.post('/events', ( req, res ) => {
    const { type, data } = req.body;

    handleEvent( type, data );

    res.send({ status: 'OK', msg: "Todo bien" });

});

app.listen( port, async () => {
    console.log("Server running on port : ", port);

    const resp = await axios.get("http://localhost:4005/events")
            .catch( err => console.log( err.message ) );

    for (let event of resp.data ) {
        console.log("Processing event : ", event.type);

        handleEvent( event.type, event.data );
    }

});