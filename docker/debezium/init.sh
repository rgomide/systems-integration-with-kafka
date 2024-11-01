#!/bin/bash
echo "Waiting for Kafka Connect to start..."
while [ $(curl -s -o /dev/null -w %{http_code} http://localhost:8083/connectors) -ne 200 ] ; do 
    echo -n "."
    sleep 5
done

echo "Creating connector..."
curl -X POST http://localhost:8083/connectors \
    -H "Content-Type: application/json" \
    -d @/opt/kafka/connect/connectors/postgres-connector.json

echo "Connector created."