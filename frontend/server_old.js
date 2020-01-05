const path = require('path')
const express = require('express')
const layout = require('express-layout')

const routes = require('../backend/routes')
const app = express()

const bodyParser = require('body-parser')


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)
