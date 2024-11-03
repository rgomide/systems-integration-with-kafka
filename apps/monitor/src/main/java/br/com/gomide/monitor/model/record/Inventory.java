package br.com.gomide.monitor.model.record;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Inventory(
    Long id,
    String name,
    String description,
    Double price,
    @JsonProperty("created_at") String createdAt,
    @JsonProperty("updated_at") String updatedAt) {
}
