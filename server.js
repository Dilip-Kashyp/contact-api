const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db')
const contactRoute = require('./routes/contactRoute');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleware/errorHandler');

const port = process.env.PORT || 8000

connectDb()
const app = express();
app.use(express.json());
app.use("/api/contacts", contactRoute);
app.use("/api/user", userRoute);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Runing on port http://localhost:${port}/`);
} );

