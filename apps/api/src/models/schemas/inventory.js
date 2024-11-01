module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    id: { type: ['integer', 'null'] }
  },
  required: ['name', 'description', 'price'],
  additionalProperties: false
}