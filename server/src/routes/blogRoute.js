const express = require('express');
const { getAllBlogs } = require('../controllers/blogController');

const blogRouter = express.Router();

blogRouter.get('', getAllBlogs);

module.exports = blogRouter;