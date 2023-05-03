require('dotenv').config();

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 8080,
        jwtActivationSecretKey: process.env.JWT_ACTIVATION_SECRET_KEY,
        smtpUsername: process.env.SMTP_USERNAME,
        smtpPassword: process.env.SMTP_PASSWORD,
        clientUrl: process.env.CLIENT_URL,
    },
    db: {
        mongodbUrl: process.env.MONGODB_URL || '',
    },
}

module.exports = dev;