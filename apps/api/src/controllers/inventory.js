const Ajv = require("ajv")
const ajv = new Ajv()
const inventorySchema = require('../models/schemas/inventory')
const inventoryModel = require('../models/inventory')

const createInventory = (req, res) => {
  let inventory = req.body

  if (ajv.validate(inventorySchema, inventory)) {
    inventory = inventoryModel.insert(inventory)
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