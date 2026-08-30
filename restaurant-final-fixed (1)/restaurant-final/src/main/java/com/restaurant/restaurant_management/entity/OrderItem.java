package com.restaurant.restaurant_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long menuItemId;
    private String itemName;
    private int quantity;
    private double price;

    public OrderItem() {}

    public OrderItem(Long menuItemId, String itemName, int quantity, double price) {
        this.menuItemId = menuItemId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
    }

    // Constructor used in services
    public OrderItem(Order order, MenuItem menuItem, int quantity, double price) {
        this.menuItemId = menuItem != null ? menuItem.getId() : null;
        this.itemName = menuItem != null ? menuItem.getName() : "";
        this.quantity = quantity;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    // Subtotal calculation method required by services
    public double getSubtotal() {
        return this.price * this.quantity;
    }
}