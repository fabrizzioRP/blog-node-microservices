import React from 'react';

const CommentList = ({ comments }) => {

    const renderedData = comments.map( cm => {
        let content;

        if( cm.status === 'approved' ){
            content = cm.content;
        }

        if( cm.status === 'pending' ){
            content = "This comment is awaiting moderation";
        }

        if( cm.status === 'rejected' ){
            content = "This comment has been rejected";
        }

        return <li key={ cm.id } >{ content }</li>
    });

    return <ul>{ renderedData }</ul>;

}

export default CommentList;