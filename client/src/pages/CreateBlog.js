import React, { useState } from 'react';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    };
    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // we use JavaScript multipart form to upload data that has image
        try {
            const newBlog = new FormData();
            newBlog.append('title', title);
            newBlog.append('description', description);
            newBlog.append('image', image);
            // for (const [key, value] of newBlog) {
            //     console.log(key, value);
            // }

            // How to make a request to backend from frontend 
            const response = await axios.post('http://127.0.0.1:8080/api/blogs', newBlog)
            console.log(response);
            setTitle('');
            setDescription('');
            setImage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={title}
                        onChange={handleTitleChange} required />
                </div>
                <div className="form-control">
                    <input type="file" name='image' onChange={handleImageChange}
                        // we accept any image format
                        accept='image/*' required />
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" value={description}
                        onChange={handleDescriptionChange} required>
                    </textarea>
                </div>
                <button type="submit">Create post</button>
            </form>
        </div>
    )
}

export default CreateBlog