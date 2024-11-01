const Sequelize = require('sequelize')

const db = require('../db/connection')

const Inventory = db.define('inventory', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false }
})

module.exports = Inventory
