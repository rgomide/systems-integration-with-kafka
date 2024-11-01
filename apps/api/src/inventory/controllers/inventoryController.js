const Ajv = require("ajv")
const ajv = new Ajv()
const inventorySchema = require('../models/schemas/inventory')
const inventoryService = require('../services/inventoryService')

const createInventory = (req, res) => {
  let inventory = req.body

  if (ajv.validate(inventorySchema, inventory)) {
    inventory = inventoryService.insert(inventory)
    res.json(inventory)
  } else {
    res
      .status(500)
      .json({ errors: ajv.errors })
  }
}

module.exports = {
  createInventory
}