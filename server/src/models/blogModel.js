const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        minlength: 3
    },
    slug: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
        trim: true,
    },
    image: {
        required: true,
        type: String,
        trim: true,
    },
},
    { timestamps: true }
);

const Blog = model('Blog', blogSchema);
module.exports = Blog;