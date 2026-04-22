// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

const reactieResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const reactieResponseJSON = await reactieResponse.json()

console.log('Hieronder moet je waarschijnlijk nog wat veranderen')
// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
 
  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op id
 
  const artikelResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news')
 
  // En haal daarvan de JSON op
  const artikelResponseJSON = await  artikelResponse.json()
    response.render('index.liquid', {news: artikelResponseJSON.data})
})

app.get('/veldverkenner', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const zoneResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants')
   

   const zoneResponseJSON = await zoneResponse.json()
   response.render('veldverkenner.liquid', {zone: zoneResponseJSON.data})
})

app.get('/collectie', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('collectie.liquid')
})

app.get('/nabloei', async function (request, response) {
 
  // Haal alle personen uit de WHOIS API op, van dit jaar, gesorteerd op id
 
  const plantResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[users][frankendael_users_id][id]=1')
 
  // En haal daarvan de JSON op
  const plantResponseJSON = await plantResponse.json()
    response.render('collectie-na-de-bloei.liquid', {plant: plantResponseJSON.data})
})

// app.get('/nabloei', async function (request, response) {
//    // Render index.liquid uit de Views map
//    // Geef hier eventueel data aan mee
//    response.render('collectie-na-de-bloei.liquid')
// })
  
app.get('/inbloei', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
     const plantResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[users][frankendael_users_id][id]=1')
 
  // En haal daarvan de JSON op
  const plantResponseJSON = await plantResponse.json()
    response.render('collectie-in-de-bloei.liquid', {plant: plantResponseJSON.data})
})

app.get('/nieuws', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
     const artikelResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news')
 
  // En haal daarvan de JSON op
  const artikelResponseJSON = await artikelResponse.json()
    response.render('nieuws.liquid', {news: artikelResponseJSON.data})

   

})

app.get('/nieuws_detail/:slug', async function (request, response) {
   
     const artikelResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news?filter[slug]='+ request.params.slug)

 
  
  const artikelResponseJSON = await artikelResponse.json()
    response.render('nieuws-details.liquid', {news: artikelResponseJSON.data[0], reactie: reactieResponseJSON.data })
});

app.post('/nieuws_detail/:slug', async (request, response) => { 
  
    console.log(request.body)
    const postResponse = await fetch(
      'https://fdnd-agency.directus.app/items/frankendael_news_comments',
      {
        // dit is JSON object met de benodigde data om wat op te slaan
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news: request.body.id,     
          comment: request.body.comment,  
          name: request.body.name,
          activeIcon: 'nieuws',
        })
      }
    )

    const postJSON = await postResponse.json()

    
    response.redirect(`/nieuws_detail/${request.params.slug}#${postJSON.data.id}`)
})


app.get('/plant_opdracht/:slug', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
     const vraagResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[slug]='+ request.params.slug)
 
  // En haal daarvan de JSON op
  const vraagResponseJSON = await vraagResponse.json()
    response.render('plant-details.liquid', {vraag: vraagResponseJSON.data[0] })
})

app.get('/bloem/:slug', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
     const plantResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[slug]='+ request.params.slug)
 
  // En haal daarvan de JSON op
  const plantResponseJSON = await plantResponse.json()
    response.render('collectie-bloem.liquid', {plant: plantResponseJSON.data[0] })
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// <form action="/nieuws/{{ news.id }}/{{ news.slug }}" method="POST"> vanuit formulier op de nieuwspagina wordt deze post route aangestuurd
app.post('/plant_opdracht', async (request, response) => {
  
    console.log(request.body)
    const postResponse = await fetch(
      'https://fdnd-agency.directus.app/items/frankendael_users_plants', // API n point van de nieuws comments (hier kan je een GET en POST doen)
      {
        // dit is JSON object met de benodigde data om wat op te slaan
        method: 'POST', // methode post meegeven zodat de server weet dat er data opgeslagen moet worden
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news: request.body.id,     
          comment: request.body.comment,  // dit is wat er in het formulierelement staat <textarea name="comment" required maxlength="100" style="height: 30px;"></textarea>
          name: request.body.name
        })
      }
    )
 
    const postJSON = await postResponse.json()
 
    // response.redirect(`/nieuws/${request.params.slug}`) // als de post gelukt is eeen redirect naar de get route VAN HET NIEUWA ARTIKEL
    response.redirect(`/nieuws/${request.params.slug}#${postJSON.data.id}`)
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.use((request, response) =>{
  response.render("404.liquid");
});
