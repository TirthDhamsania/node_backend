require('dotenv').config();
const express = require('express');
const {connect} = require('mongoose');
const { PORT, MONGODB_URL } = require("./config");
const cors = require('cors')

// Initialize application
const app = express();
app.use(express.json());
app.use(cors())

const userRouter = require('./routes/user.route');
app.use('/user', userRouter);

const startApp = () => {
    // DB Connection
    connect(MONGODB_URL, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(() => console.log(`Successfully connected to ${MONGODB_URL}`))
        .catch((err) => console.error(`Database error ${err}`));

    // Listen the app
    app.listen(PORT, () =>
        console.log(`Server started on port ${PORT}`)
    );
};

startApp();
