import React, { useState, useEffect } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {

    const [ posts, setPosts ] = useState({});

    const fetchPosts = async () => {
        const { data } = await axios.get("http://localhost:4002/posts");

        setPosts( data );
    }

    useEffect( () => {
        fetchPosts();
    }, []);

    const renderedPost = Object.values( posts ).map( post => {
        
        return <div key={ post.id } className="card" style={{ witdh:'30%', marginBottom: '20px' }}>
            <div className="card-body">
                <h3>{ post.title }</h3>

                <CommentList comments={ post.comments } />

                <CommentCreate id={ post.id } />
            </div>
        </div>;

    });

    return <div className="d-flex flex-row flex-wrap justify-content-between" >
        { renderedPost }
    </div>;
}

export default PostList;