if (process.env.NODE_ENV !== 'production') {
    console.error('here');
    require('dotenv').load;
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRoute = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
console.error(process.env.DB_URL);
mongoose.connect('mongodb://localhost/mybrary', {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose.'));

app.use(indexRoute);

app.listen(process.env.PORT || 3000);