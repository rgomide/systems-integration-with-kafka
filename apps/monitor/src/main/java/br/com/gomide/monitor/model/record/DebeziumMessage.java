package br.com.gomide.monitor.model.record;

public record DebeziumMessage(
    Object before,
    Object after,
    Source source,
    String op,
    Long ts_ms,
    Object transaction) {

}
