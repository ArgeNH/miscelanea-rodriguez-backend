const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const paymentsR = require('../routes/payment');

require('../database/connect-mongo');
require('dotenv').config();
const app = express();
app.use(morgan('dev'));
app.use(paymentsR);

//settings
app.set('port', process.env.PORT || 5000);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api/user', require('../routes/user'));
app.use('/api/product', require('../routes/product'));
app.use('/api/payments', require('../routes/payment'));

app.listen(app.get('port'), () => {
   console.log(`API is listen in port ${app.get('port')}`);
});