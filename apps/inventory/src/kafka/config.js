const { Kafka } = require('kafkajs')

const KAFKA_BROKERS = process.env.KAFKA_BROKERS

const kafka = new Kafka({
  clientId: 'inventory-consumer',
  brokers: [KAFKA_BROKERS]
})

module.exports = kafka