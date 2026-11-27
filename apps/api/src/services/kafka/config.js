const { Kafka } = require('kafkajs')

const KAFKA_BROKERS = process.env.KAFKA_BROKERS

const kafka = new Kafka({
  clientId: 'inventory-api',
  brokers: [KAFKA_BROKERS]
})

// Small fetch sizes for didactic demos (process messages in tiny batches)
const didacticConsumerConfig = {
  maxBytesPerPartition: 1024,
  maxBytes: 2048,
  minBytes: 1,
  maxWaitTimeInMs: 500
}

module.exports = kafka
module.exports.didacticConsumerConfig = didacticConsumerConfig
