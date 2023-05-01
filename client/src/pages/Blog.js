import React from 'react'

const Blog = (props) => {
    const { title, image, description } = props.blog;
    console.log(image);
    return (
        <div>
            {/* image here is a url */}
            {/* <img src={image} alt={title} /> */}
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default Blog