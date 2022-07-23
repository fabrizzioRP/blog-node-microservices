import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ id }) => {

    const [ content, setContent ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:4001/posts/${ id }/comments`, {
            content
        });

        setContent('');
    }

    return <div>
        <form onSubmit={onSubmit} >
            <div className='form-group' >
                <label>New Comments : </label>
                <input value={content} 
                onChange={ e => setContent( e.target.value ) } 
                className='form-control' />
            </div>
            <button className='btn btn-primary' >Submit</button>
        </form>
    </div>;
}

export default CommentCreate;