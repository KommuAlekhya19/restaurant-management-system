package com.restaurant.restaurant_management.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Chef capabilities: view KOT (Kitchen Order Ticket) and update food preparation status.
 */
@RestController
@RequestMapping("/api/chef")
@PreAuthorize("hasAnyRole('CHEF','ADMIN')")
public class ChefController {

    @GetMapping("/kot")
    public List<Map<String, Object>> viewKot() {
        // Placeholder - wire this up to the real Kitchen/Order service module
        return List.of(
                Map.of("orderId", 101, "tableNo", 1, "item", "Chicken Biryani", "status", "PENDING"),
                Map.of("orderId", 102, "tableNo", 3, "item", "Paneer Butter Masala", "status", "IN_PROGRESS")
        );
    }

    @PutMapping("/orders/{orderId}/status")
    public Map<String, Object> updateFoodStatus(@PathVariable Long orderId,
                                                 @RequestBody Map<String, String> body) {
        String newStatus = body.getOrDefault("status", "IN_PROGRESS");
        // Placeholder - persist status change via the real Order service module
        return Map.of(
                "orderId", orderId,
                "updatedStatus", newStatus,
                "message", "Food status updated"
        );
    }
}
