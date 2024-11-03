const { getIo } = require('../../services/socket/setup')
const kafka = require('../../services/kafka/config')

const consumer = kafka.consumer({ groupId: 'inventory-report-consumer' })

const consumerModule = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'postgres.public.inventories', fromBeginning: true })

  await consumer.run({
    eachMessage: async (event) => {
      logMessage(event)

      const { message: { value } } = event

      if (!value) {
        return
      }

      const decodedMessageValue = value.toString()
      const parsedMessage = JSON.parse(decodedMessageValue)

      const io = getIo()

      if (io) {
        io.emit('inventory-monitor', parsedMessage)
      }
    }
  })
}

const logMessage = (event) => {
  const { topic, partition, message: { offset, value, timestamp } } = event

  const time = new Date(Number.parseInt(timestamp)).toISOString()

  console.log('CONSUMING MESSAGE:')
  console.log(`Topic: ${topic}`)
  console.log(`Partition: ${partition}`)
  console.log(`Timestamp: ${time}`)
  console.log(`Offset: ${offset}`)

  if (value) {
    console.log('message', value.toString())
  }

  console.log('\n')
}

process.on('SIGINT', async () => {
  console.log('Disconnecting the Kafka consumer');
  await consumer.disconnect();
  process.exit();
});

module.exports = consumerModule
