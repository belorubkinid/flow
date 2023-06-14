require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;

const indexRouter = require('./routes/index.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRoutes = require('./routes/category.routes');
const bouquetsRouter = require('./routes/bouquets.routes');
const orderRouter = require('./routes/order.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const corsConfig = {
  origin: process.env.CORS_URL,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/categories', categoryRoutes);
app.use('/bouquets', bouquetsRouter);
app.use('/order', orderRouter);

app.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}`);
});

module.exports = app;
