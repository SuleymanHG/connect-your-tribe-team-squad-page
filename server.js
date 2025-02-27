import express from 'express'

import { Liquid } from 'liquidjs';


// Vul hier jullie team naam in
const teamName = 'Rad';


const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))


app.get('/', async function (request, response) {
  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":"Team ${teamName}"}`)
  const messagesResponseJSON = await messagesResponse.json()

  response.render('index.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data
  })
})

app.get('/birthdate', async function (request, response) {

  const personBirthdate = await fetch('https://fdnd.directus.app/items/person/?sort=birthdate')

  const personBirthdateJSON = await personBirthdate.json()
  
  response.render('statische-main-pages/birthdate.liquid', {persons: personBirthdateJSON.data})
})

app.get('/a-z', async function (request, response) {

  const personName = await fetch('https://fdnd.directus.app/items/person/?sort=name')

  const personNameJSON = await personName.json()
  
  response.render('statische-main-pages/a-z.liquid', {persons: personNameJSON.data})
})






















































app.get('/hobby/:id', async function (request, response) {
  const hobby = request.params.id; // Pak de hobby van de URL

  // Geef hoofdletter mee aan elke hobby 
  const capitalizedHobby = hobby.charAt(0).toUpperCase() + hobby.slice(1).toLowerCase();

  // Pak data voor geselecteerde hobby
  const hobbyUrl = `https://fdnd.directus.app/items/person/?filter={"fav_hobby":"${capitalizedHobby}"}`;
  const hobbyApiResponse = await fetch(hobbyUrl);
  const personData = await hobbyApiResponse.json();

  response.render('statische-main-pages/hobbypage/hobbys.liquid', {hobby: capitalizedHobby, persons: personData.data}); // geef alle data mee aan de liquid html
}); 

app.get('/hobbyfilterkeuze', async function (request, response) {

  response.render('statische-main-pages/hobbypage/hobbysfilterkeuze.liquid' ); // geef alle data mee aan de liquid html
}); 


app.get('/boek/:id', async function (request, response) {
  const genre = request.params.id; // Pak de genre van de URL

  const capitalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();

  const genreUrl = `https://fdnd.directus.app/items/person/?filter={"fav_genre":"${capitalizedGenre}"}`;
  const genreApiResponse = await fetch(genreUrl);
  const personData = await genreApiResponse.json();

  response.render('statische-main-pages/boekenpage/boeken.liquid', {genre: capitalizedGenre, persons: personData.data}); // geef alle data mee aan de liquid html
}); 

app.get('/genreboekenkeuze', async function (request, response) {

  response.render('statische-main-pages/boekenpage/boekenfilterkeuze.liquid' ); // geef alle data mee aan de liquid html
}); 




















app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}