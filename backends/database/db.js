const mongoose = require('mongoose');

const mongoURI = "mongodb://mongodb-service:27017/riva_backend"; // MongoDB service name and port

const connectToMongoose = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
            authSource: 'admin' // MongoDB admin database for authentication
        },
        user: process.env.MONGO_INITDB_ROOT_USERNAME, // MongoDB username from environment variable
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD // MongoDB password from environment variable
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectToMongoose;
