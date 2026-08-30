package com.restaurant.restaurant_management.dto;

import java.util.List;

public class CreateOrderRequest {

    private Long tableId;
    private List<OrderItemRequest> items;

    public CreateOrderRequest() {
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}