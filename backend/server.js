require('dotenv').config()
const express = require('express');
const connectdb = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const authRoutes= require('./routes/authRoutes')
const { notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
connectdb();

app.use(express.json())
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => 
    console.log(`Server started at port ${port}`)
);