const { successHandler } = require("./requestHandler");


const getAllBlogs = async (req, res, next) => {
    try {
        return successHandler(res, 200, 'return all the blogs', []);
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
        return successHandler(res, 200, 'blog was created successfully', []);
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