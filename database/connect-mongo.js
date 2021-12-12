const mongoose = require('mongoose');

const url = 'mongodb+srv://gerencia:MkrIiD4AOPNbbOVg@cluster0.qiivs.mongodb.net/miscelanea';

mongoose.connect(url)
    .then(() => console.log('Connect DB Success'))
    .catch((err) => console.log(`ERROR to connect : ${err.message}`));

module.exports = mongoose;