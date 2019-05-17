const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brent'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'BDS'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Brent',
        helpTitle: 'How to see weather for your location',
        helpText: 'yadda....yadda....yadda....yadda....yadda....yadda....yadda....yadda....yadda....yadda....yadda....yadda....'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location that you want the weather for.'
        })
    }
    //  http://localhost:3000/weather?address=Storm%20Lake,%20IA

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, weather) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: weather,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help file not found',
        pageNotFoundText: 'Help article not found. TODO: show list of helps'
    })
})


// 4040 must be last
app.get('*', (req, res) => {
    res.render('404', {
        title: 'You lost??',
        pageNotFoundText: 'My 404 page'})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
} )