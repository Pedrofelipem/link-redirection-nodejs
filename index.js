const express = require('express');
const mongoose = require('mongoose'); 
const linkRoute =  require('./routes/linkRoute')

const path = require('path')
const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/links', { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection

db.on('error', () => console.log('foi error'));
db.once('open', () => console.log('foi open'));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', linkRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

