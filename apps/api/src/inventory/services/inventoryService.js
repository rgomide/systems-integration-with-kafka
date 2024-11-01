const { sendMessage } = require('../../services/kafka/producer')

const insert = async (inventory) => {
  const kafkaMessage = {
    verb: 'ADD_INVENTORY',
    params: inventory
  }

  await sendMessage(kafkaMessage)

  return inventory
}

module.exports = {
  insert
}