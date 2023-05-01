const createError = require("http-errors");
const slugify = require('slugify')

const { successHandler, errorHandler } = require("./requestHandler");
const Blog = require("../models/blogModel");

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        return successHandler(res, 200, 'return all the blogs', blogs);
    } catch (error) {
        next(error)
    }
};
const getSingleBlog = async (req, res, next) => {
    try {
        return successHandler(res, 200, 'return the single blog', []);
    } catch (error) {
        next(error)
    }
};
const createBlog = async (req, res, next) => {
    try {
        // step 1: get the data from request
        const { title, description } = req.body;

        // when we are throwing any error the catch will handle it
        //  and catch will call the next middleware
        if (!title || !description) throw createError(404,
            'title or description is missing');
        if (title.length < 3) throw createError(400,
            'title length should be at least 3 characters');

        const image = req.file;
        if (image && image.size > Math.pow(1024 * 1024 * 1))
            throw createError(400,
                'file is too large. It must be less than 1 mb in size');

        // step 3: check the user already exiswt or not
        const blog = await Blog.findOne({ title });

        if (blog) throw createError(
            400,
            'blog with this title already exists. Please create with another title'
        );

        const newBlog = new Blog({
            // here we are storing title,description and image (from image we store only path)
            // title and description in coming from destructering req.body in step 1 above
            title: title,
            // create unique text with slugify
            slug: slugify(title),
            description: description,
            image: req.file.path
        });
        // we are storing the data in database here:
        const blogData = await newBlog.save();

        if (!blogData) return errorHandler(res, 400, 'blog was not created')

        return successHandler(res, 200, 'blog was created successfully', blogData);
    } catch (error) {
        next(error)
    }
};
const deleteBlog = async (req, res, next) => {
    try {
        return successHandler(res, 200, 'blog was deleted successfully', []);
    } catch (error) {
        next(error)
    }
};
const updateBlog = async (req, res, next) => {
    try {
        return successHandler(res, 200, 'blog was updated successfully', []);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllBlogs, createBlog,
    deleteBlog, updateBlog, getSingleBlog
}