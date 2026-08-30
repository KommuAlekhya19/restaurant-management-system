package com.restaurant.restaurant_management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tableId;
    private String customerName;
    private String status; // PENDING, PREPARING, COMPLETED, CANCELLED
    private double totalAmount;
    private LocalDateTime orderTime;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItem> orderItems;

    public Order() {
        this.orderTime = LocalDateTime.now();
    }

    // Constructor used in services
    public Order(RestaurantTable table, String customerName) {
        this.tableId = table != null ? table.getId() : null;
        this.customerName = customerName;
        this.status = "PENDING";
        this.orderTime = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTableId() { return tableId; }
    public void setTableId(Long tableId) { this.tableId = tableId; }

    // Compatibility method for BillingService
    public Long getTable() {
        return this.tableId;
    }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDateTime getOrderTime() { return orderTime; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }

    // Compatibility alias methods for OrderService
    public List<OrderItem> getItems() { 
        return orderItems; 
    }
    public void setItems(List<OrderItem> orderItems) { 
        this.orderItems = orderItems; 
    }
}