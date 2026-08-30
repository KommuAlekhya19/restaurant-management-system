package com.restaurant.restaurant_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_tables")
public class RestaurantTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int tableNumber;
    private int seatingCapacity;
    private String status; // AVAILABLE, OCCUPIED, RESERVED

    public RestaurantTable() {}

    public RestaurantTable(int tableNumber, int seatingCapacity, String status) {
        this.tableNumber = tableNumber;
        this.seatingCapacity = seatingCapacity;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getTableNumber() { return tableNumber; }
    public void setTableNumber(int tableNumber) { this.tableNumber = tableNumber; }

    public int getSeatingCapacity() { return seatingCapacity; }
    public void setSeatingCapacity(int seatingCapacity) { this.seatingCapacity = seatingCapacity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}