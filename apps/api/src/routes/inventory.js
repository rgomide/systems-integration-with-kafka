const express = require('express')
const router = express.Router()
const { createInventory } = require('../controllers/inventory')

router.post('/inventory', createInventory)

module.exports = router