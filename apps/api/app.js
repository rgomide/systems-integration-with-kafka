const inventoryRoutes = require('./src/routes/inventoryRoutes')
const express = require('express')
const port = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(inventoryRoutes)

module.exports = app