const express = require('express')
const router = express.Router()
const { createInventory } = require('../inventory/controllers/inventoryController')

router.post('/inventory', createInventory)
router.get('/', (req, res) => {
  res.render('inventory/index')
})

module.exports = router