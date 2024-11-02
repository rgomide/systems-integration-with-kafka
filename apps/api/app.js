const inventoryRoutes = require('./src/routes/inventoryRoutes')
const express = require('express')
const consumerModule = require('./src/inventory/services/inventoryConsumer')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(inventoryRoutes)

consumerModule()

module.exports = app