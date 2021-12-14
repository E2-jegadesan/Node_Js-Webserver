const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// define paths for Express config
const publicpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

// setup static direvtory to serve
app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'My Application',
        name: 'Jegadesan',
        End: 'Created By Jegadesan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'I am a software developer',
        End: 'Created By Jegadesan'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'weather Report',
        passage: 'Check Weather Reports',
        End: 'Created By Jegadesan'
    })
})
// query string
app.get('/location', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter your addresss'
        })
    }
    // geocode and forecast address connection
    geocode(req.query.address, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(location, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            // console.log(req.query.address)
            res.send({
                forecast: forecast,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/header', (req, res) => {
    res.render('header', {
        title: 'Welcome To all'
    })
})

app.get('/footer', (req, res) => {
    res.render('footer', {
        footer: 'thanks you'
    })
})
app.get('/header/*', (req, res) => {
    res.render('header', {
        title: 'header article Not found'
    })
})
app.get('/footer/*', (req, res) => {
    res.render('footer', {
        title: 'footer article Not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page Not Found',
        End: 'Created By Jegadesan'
    })
})



// app.get('/footer/*',(req,res)=>{
//     res.render('Header Article not found')
// })
app.listen(3000, () => {
    console.log('server is up on port 3000')
})