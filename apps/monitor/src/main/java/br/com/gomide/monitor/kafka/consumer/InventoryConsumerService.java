package br.com.gomide.monitor.kafka.consumer;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
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
  public void consumeMessage(String message) {
    try {
      DebeziumMessage debeziumMessage = objectMapper.readValue(message, DebeziumMessage.class);
      if(debeziumMessage.op().equals("c")) {
        Inventory inventory = debeziumMessage.after();
        logger.info("INVENTORY CREATED: " + inventory);
      }
    } catch (Exception e) {
      logger.severe("Error parsing inventory message: " + e.getMessage());
    }
  }
}