const express = require('express');
const app = express();
const port = 4000
const pokemon = require('./models/pokemon')
const methodOverride = require('method-override')

//Importing Routers:
const pokemonRouter = require('./routers/pokemonRouter')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));


app.use('/pokemon', pokemonRouter)

app.listen(4000, () => {
    console.log('Server listening on PORT 4000')
})