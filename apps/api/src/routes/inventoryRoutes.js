const express = require('express')
const router = express.Router()
const { createInventory } = require('../inventory/controllers/inventoryController')

router.post('/inventory', createInventory)

module.exports = router