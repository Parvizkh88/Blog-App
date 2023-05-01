const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getSingleBlog } = require('../controllers/blogController');
const upload = require('../middleware/fileUpload');

const blogRouter = express.Router();

blogRouter.route('/')
    .get(getAllBlogs)
    .post(upload.single('image'), createBlog);


blogRouter.route('/:id')
    .get(getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog);

// wildcard route
blogRouter.use('*', (req, res, next) => {
    res.send('route not found')
})

module.exports = blogRouter;