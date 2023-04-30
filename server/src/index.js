const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const dev = require('./config');
const connectDB = require('./config/db');
const blogRouter = require('./routes/blogRoute');

const app = express();

const port = dev.app.serverPort;
app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
    await connectDB();
});

app.get('/test-api', (req, res) => {
    res.send('api is working fine');
});

app.use(morgan('dev'));

app.use('/api/blogs', blogRouter)
// client error
app.use((req, res, next) => {
    next(createError(404, 'Route Not Found'))
});

// 500
app.use((err, req, res, next) => {
    const statusCode = err.status
    res.status(statusCode || 500).json({
        error: {
            statusCode: statusCode || 500,
            message: err.message
        }
    });
});