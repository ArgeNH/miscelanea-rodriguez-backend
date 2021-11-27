const express = require('express');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api', require('../routes/index'));

app.listen(app.get('port'), () => {
    console.log(`API is listen in port ${app.get('port')}`);
});