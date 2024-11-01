const kafka = require('./config')

const sendMessage = async (message) => {
  const producer = kafka.producer()

  await producer.connect()

  const kafkaMessage = {
    topic: 'inventory',
    messages: [{ value: JSON.stringify(message) }]
  }

  await producer.send(kafkaMessage)

  await producer.disconnect()
}

module.exports = {
  sendMessage
}