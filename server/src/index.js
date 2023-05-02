const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const dev = require('./config');
const connectDB = require('./config/db');
const blogRouter = require('./routes/blogRoute');
const userRouter = require('./routes/userRoute');

const app = express();

const port = dev.app.serverPort;
app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
    await connectDB();
});

app.get('/test-api', (req, res) => {
    res.send('api is working fine');
});
//cors adds the necessary response headers to your server's HTTP responses to allow
// client-side JavaScript to make requests to your server from a different domain.
app.use(cors({
    // from this place I will make the request
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true// when user make http only cookie request we want to access the cookie
}));
// we will send the request to the server with the cookie and then we need to parse the cookie
// so, we extract specific information from an HTTP cookie that has been sent by a server to a client.
app.use(cookieParser());

app.use('/public', express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
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