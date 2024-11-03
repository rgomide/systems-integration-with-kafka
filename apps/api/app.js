const inventoryRoutes = require('./src/routes/inventoryRoutes')
const express = require('express')
const consumerModule = require('./src/inventory/services/inventoryConsumer')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(express.static(__dirname + '/public'))

app.use(inventoryRoutes)

consumerModule()

module.exports = app