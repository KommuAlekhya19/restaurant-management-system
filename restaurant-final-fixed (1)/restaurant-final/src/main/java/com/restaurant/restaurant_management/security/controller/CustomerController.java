package com.restaurant.restaurant_management.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Customer self-service capabilities: browse the menu, place their own
 * orders, and view their own order history. Route-level access is already
 * restricted to CUSTOMER/ADMIN in SecurityConfig; @PreAuthorize is added too
 * for defense-in-depth / method-level clarity.
 */
@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
public class CustomerController {

    // Placeholder in-memory order log so "My Orders" has something to show.
    // Wire this up to the real Order service module / database table.
    private final List<Map<String, Object>> orders = new CopyOnWriteArrayList<>();
    private final AtomicLong orderIdSeq = new AtomicLong(1000);

    @GetMapping("/menu")
    public List<Map<String, Object>> viewMenu() {
        // Placeholder data - wire this up to the real Menu service module
        return List.of(
                Map.of("id", 1, "name", "Masala Dosa", "category", "South Indian", "price", 120.00),
                Map.of("id", 2, "name", "Chicken Biryani", "category", "Main Course", "price", 280.00),
                Map.of("id", 3, "name", "Paneer Butter Masala", "category", "Main Course", "price", 240.00),
                Map.of("id", 4, "name", "Gulab Jamun", "category", "Dessert", "price", 90.00),
                Map.of("id", 5, "name", "Filter Coffee", "category", "Beverage", "price", 60.00)
        );
    }

    @PostMapping("/orders")
    public Map<String, Object> placeOrder(@RequestBody Map<String, Object> orderPayload, Authentication auth) {
        // Placeholder - wire this up to the real Order service module
        Long orderId = orderIdSeq.incrementAndGet();
        Map<String, Object> order = Map.of(
                "orderId", orderId,
                "placedBy", auth.getName(),
                "status", "PENDING",
                "item", orderPayload.getOrDefault("item", ""),
                "quantity", orderPayload.getOrDefault("quantity", 1)
        );
        orders.add(0, order);
        return Map.of(
                "message", "Order placed! The kitchen has been notified.",
                "order", order
        );
    }

    @GetMapping("/orders")
    public List<Map<String, Object>> myOrders(Authentication auth) {
        // Placeholder - wire this up to the real Order service module
        // (filtering by the current customer once orders are persisted)
        return orders.stream()
                .filter(o -> auth.getName().equals(o.get("placedBy")))
                .toList();
    }
}
