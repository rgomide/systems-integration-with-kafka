const { getIo } = require('../../services/socket/setup')
const kafka = require('../../services/kafka/config')

const consumer = kafka.consumer({
  groupId: 'inventory-report-consumer',
  ...kafka.didacticConsumerConfig
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const consumerModule = async (attempt = 1) => {
  try {
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
  } catch (error) {
    console.error(`Kafka consumer failed (attempt ${attempt}):`, error.message)
    try {
      await consumer.disconnect()
    } catch (_) {
      // ignore disconnect errors during retry
    }
    await sleep(Math.min(attempt * 2000, 10000))
    return consumerModule(attempt + 1)
  }
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
