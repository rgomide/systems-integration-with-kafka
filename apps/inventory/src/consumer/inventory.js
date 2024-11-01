const kafka = require('../kafka/config')
const { create } = require('../controllers/inventory')

const consumer = kafka.consumer({ groupId: 'inventory-consumer' })

const consumerModule = async () => {
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

module.exports = consumerModule