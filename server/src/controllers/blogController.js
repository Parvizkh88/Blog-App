

const getAllBlogs = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'return all the blogs',
            data: []
        })
    } catch (error) {
        next(error)
    }
};
const getSingleBlog = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'return the single blog',
            data: []
        })
    } catch (error) {
        next(error)
    }
};
const createBlog = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: 'blog was created successfully',
            data: []
        })
    } catch (error) {
        next(error)
    }
};
const deleteBlog = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'blog was deleted successfully',
            data: []
        })
    } catch (error) {
        next(error)
    }
};
const updateBlog = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'blog was updated successfully',
            data: []
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllBlogs, createBlog,
    deleteBlog, updateBlog, getSingleBlog
}