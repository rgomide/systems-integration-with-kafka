package br.com.gomide.monitor.kafka.consumer;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.gomide.monitor.model.record.DebeziumMessage;
import br.com.gomide.monitor.model.record.Inventory;

@Service
public class InventoryConsumerService {

  private final ObjectMapper objectMapper;
  private static final Logger logger = Logger.getLogger(InventoryConsumerService.class.getName());

  @Autowired
  public InventoryConsumerService(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  @KafkaListener(topics = "postgres.public.inventories", groupId = "monitor")
  public void consumeMessage(@Payload(required = false) String message) {
    try {
      if (message == null || message.isBlank()) {
        return;
      }

      DebeziumMessage debeziumMessage = objectMapper.readValue(message, DebeziumMessage.class);

      String operation = debeziumMessage.op();

      switch (operation) {
        case "c":
          Inventory inventory = objectMapper.convertValue(debeziumMessage.after(), Inventory.class);
          logger.info("INVENTORY CREATED: " + inventory);
          break;
        case "u":
          Inventory inventoryUpdated = objectMapper.convertValue(debeziumMessage.after(), Inventory.class);
          Inventory inventoryBefore = objectMapper.convertValue(debeziumMessage.before(), Inventory.class);

          logger.info("INVENTORY UPDATED: " + inventoryUpdated + "\nBEFORE: " + inventoryBefore);
          break;
        case "d":
          if (debeziumMessage.before() != null) {
            Inventory inventoryDeleted = objectMapper.convertValue(debeziumMessage.before(), Inventory.class);
            logger.info("INVENTORY DELETED: " + inventoryDeleted);
          }
          break;
      }
    } catch (Exception e) {
      logger.warning("Error parsing inventory message: " + e.getMessage());
    }
  }
}