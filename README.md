# Inventory Service

## Development

```bash
docker compose up --build
```

## Making a HTTP Request to API

```bash
curl -XPOST -H "Content-type: application/json" -d '{
  "name": "New Product",
  "description": "Awesome Product",
  "price": 12.43
}' 'http://localhost:3000/inventory'
```

## User Interfaces
- [Debezium UI](http://localhost:8084)
- [Redpanda](http://localhost:8081)