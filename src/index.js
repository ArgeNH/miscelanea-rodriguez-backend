const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('../database/connect-mongo');
const app = express();
app.use(morgan('dev'));

app.get('/',(req,res) =>{
    res.json({author:'Grupo 2',descripcion:'miscelanea'})
});
//settings
app.set('port', process.env.PORT || 5000);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use('/api/user', require('../routes/user'));

app.listen(app.get('port'), () => {
    console.log(`API is listen in port ${app.get('port')}`);
});