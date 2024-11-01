const Inventory = require('../models/inventory')

const create = async (inventory) => {
  await Inventory.create(inventory)
}

module.exports = { create }
