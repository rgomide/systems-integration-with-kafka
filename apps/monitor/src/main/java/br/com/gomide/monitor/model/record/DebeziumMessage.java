package br.com.gomide.monitor.model.record;

public record DebeziumMessage(
  Object before,
  Inventory after,
  Source source,
  String op,
  Long ts_ms,
  Object transaction
) {
  
}
