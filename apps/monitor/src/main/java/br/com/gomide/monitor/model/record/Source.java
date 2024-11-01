package br.com.gomide.monitor.model.record;

public record Source(
    String version,
    String connector,
    String name,
    Long ts_ms,
    String snapshot,
    String db,
    String sequence,
    String schema,
    String table,
    Long txId,
    Long lsn,
    Object xmin) {

}
