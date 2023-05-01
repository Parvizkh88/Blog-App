import React, { useState } from 'react'

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    return (
        <div>
            <h1>Create Blog</h1>
            <form>
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
            </form>
        </div>
    )
}

export default CreateBlog