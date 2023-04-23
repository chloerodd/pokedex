const pokemon = require('../models/pokemon.js')

// INDEX:
const getAllPokemon = (req, res) => {
    res.render('index.ejs', {pokemon})
}

// New Pokemon Form:
const sendNewPokemonForm = (req, res) => {
    res.render('new.ejs')
}

// Post New Pokemon:
const postNewPokemon = (req, res) => {
    console.log(req.body)
    req.body.type = [req.body.type]
    const {hp, attack, defense} = req.body
    req.body.stats = {hp, attack, defense} // Adding the nested stats object to req.body and passing in the extracted values.
    pokemon.unshift(req.body);
    res.redirect('/pokemon')
}

// Show one Pokemon:
const showOnePokemon = (req, res) => {
    const id = req.params.id
    const singlePokemon = pokemon.find(p=>p.id == id)
    singlePokemon.id = parseInt(singlePokemon.id)
    res.render('show.ejs', {singlePokemon})
}

// Edit & Update Pokemon:
const editPokemon = (req, res) => {
    const id = req.params.id
    const singlePokemon = pokemon.find(p=>p.id == id)
    console.log(singlePokemon)
    res.render('edit.ejs', {singlePokemon})
}

const updatePokemon = (req, res) => {
  const {name, type,  HP, attack, defense} = req.body  
  const newBody = {name, type:[type], stats:{hp: HP, attack, defense}}
  const id = req.params.id
  const oldPokemon = pokemon.find(p=>p.id == id)
  const newPokemon = Object.assign(oldPokemon, newBody)
  let pokeIndex;
  pokemon.map((p, i) => {
    if(p.id === id){
        pokeIndex = i
    }
  })
  pokemon.splice(pokeIndex, 1, newPokemon)
  res.redirect('/pokemon')
}


// Delete Route:
const deletePokemon = (req, res) => {
	pokemon.splice(req.params.id, 1);
	res.redirect('/pokemon')
}

module.exports = {
    getAllPokemon,
    sendNewPokemonForm,
    postNewPokemon,
    showOnePokemon,
    editPokemon,
    updatePokemon,
    deletePokemon
}