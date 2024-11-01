const Sequelize = require('sequelize')

const POSTGRES_HOST = process.env.POSTGRES_HOST
const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_PORT = process.env.POSTGRES_PORT


const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

const sequelize = new Sequelize(connectionString, { dialect: 'postgres', define: { underscored: true } })

module.exports = sequelize
