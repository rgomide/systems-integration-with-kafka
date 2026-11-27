const kafka = require('../kafka/config')
const { create } = require('../controllers/inventoryController')

const consumer = kafka.consumer({
  groupId: 'inventory-consumer',
  ...kafka.didacticConsumerConfig
})

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const consumerModule = async (attempt = 1) => {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'inventory', fromBeginning: true })

    await consumer.run({
      eachMessage: async (event) => {
        logMessage(event)

        const { message: { value } } = event

        const decodedMessageValue = value.toString()

        let parsedMessage = decodedMessageValue

        try {
          parsedMessage = JSON.parse(decodedMessageValue)
          dispatchMessage(parsedMessage)
        } catch (error) {
          console.log(error)
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
  console.log('message', value.toString())
  console.log('\n')
}

const dispatchMessage = ({ verb, params }) => {
  switch (verb) {
    case 'ADD_INVENTORY':
      create(params)
  }
}

process.on('SIGINT', async () => {
  console.log('Disconnecting the Kafka consumer');
  await consumer.disconnect();
  process.exit();
});

module.exports = consumerModule
