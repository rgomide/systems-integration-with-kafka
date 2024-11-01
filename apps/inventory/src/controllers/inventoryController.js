const Inventory = require('../models/Inventory')

const create = async (inventory) => {
  await Inventory.create(inventory)
}

module.exports = { create }
