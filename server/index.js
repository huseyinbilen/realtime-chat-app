const express = require('express');
const app = express();

const pageRoute = require('./routes/pageRoutes');

const PORT = 3000;

app.use('/', pageRoute);

app.listen(3000, () => {
    console.log('App Started on Port:', PORT);
});