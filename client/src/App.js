import React from "react";

import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
    return <div style={{ marginTop : '40px' }}>
        <h1>Create Post</h1>
        <PostCreate/>
        <hr/>
        <h1>Posts</h1>
        <PostList/>
    </div>;
}

export default App;