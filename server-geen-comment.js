import express from 'express'

import { Liquid } from 'liquidjs';

const reactieResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments')


const reactieResponseJSON = await reactieResponse.json()

console.log('Hieronder moet je waarschijnlijk nog wat veranderen')

const app = express()

const baseUrl = 'https://fdnd-agency.directus.app/items/frankendael_news'
const collectieUrl = 'https://fdnd-agency.directus.app/items/frankendael_plants?filter[users][frankendael_users_id][id]=1'

app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))


const engine = new Liquid();
app.engine('liquid', engine.express());


app.set('views', './views')


app.get('/', async function (request, response) {



    const artikelResponse = await fetch('${baseUrl}/$')


    const artikelResponseJSON = await artikelResponse.json()
    response.render('index.liquid', { news: artikelResponseJSON.data })
})

app.get('/veldverkenner', async function (request, response) {

    const zoneResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants')


    const zoneResponseJSON = await zoneResponse.json()
    response.render('veldverkenner.liquid', { zone: zoneResponseJSON.data })
})

app.get('/collectie', async function (request, response) {

    response.render('collectie.liquid')
})

app.get('/nabloei', async function (request, response) {



    const plantResponse = await fetch('${collectieUrl}/$')


    const plantResponseJSON = await plantResponse.json()
    response.render('collectie-na-de-bloei.liquid', { plant: plantResponseJSON.data })
})



app.get('/inbloei', async function (request, response) {

    const plantResponse = await fetch('${collectieUrl}/$')


    const plantResponseJSON = await plantResponse.json()
    response.render('collectie-in-de-bloei.liquid', { plant: plantResponseJSON.data })
})

app.get('/nieuws', async function (request, response) {

    const artikelResponse = await fetch('${baseUrl}/$')


    const artikelResponseJSON = await artikelResponse.json()
    response.render('nieuws.liquid', { news: artikelResponseJSON.data })



})

app.get('/nieuws_detail/:slug', async function (request, response) {

    const artikelResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news?filter[slug]=' + request.params.slug)



    const artikelResponseJSON = await artikelResponse.json()
    response.render('nieuws-details.liquid', { news: artikelResponseJSON.data[0], reactie: reactieResponseJSON.data })
});

app.post('/nieuws_detail/:slug', async (request, response) => {

    console.log(request.body)
    const postResponse = await fetch(
        'https://fdnd-agency.directus.app/items/frankendael_news_comments',
        {

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

    const vraagResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[slug]=' + request.params.slug)


    const vraagResponseJSON = await vraagResponse.json()
    response.render('plant-details.liquid', { vraag: vraagResponseJSON.data[0] })
})

app.get('/bloem/:slug', async function (request, response) {
    const plantResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants?filter[slug]=' + request.params.slug)


    const plantResponseJSON = await plantResponse.json()
    response.render('collectie-bloem.liquid', { plant: plantResponseJSON.data[0] })
})


app.post('/', async function (request, response) {
    response.redirect(303, '/')
})


app.post('/plant_opdracht', async (request, response) => {

    console.log(request.body)
    const postResponse = await fetch(
        'https://fdnd-agency.directus.app/items/frankendael_users_plants',
        {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                news: request.body.id,
                comment: request.body.comment,
                name: request.body.name
            })
        }
    )

    const postJSON = await postResponse.json()

    response.redirect(`/nieuws/${request.params.slug}#${postJSON.data.id}`)
})


app.set('port', process.env.PORT || 8000)


app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

app.use((request, response) => {
    response.render("404.liquid");
});
