package com.restaurant.restaurant_management.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Waiter capabilities: view tables and take orders.
 * Route-level access is already restricted to WAITER/ADMIN in SecurityConfig,
 * @PreAuthorize is added too for defense-in-depth / method-level clarity.
 */
@RestController
@RequestMapping("/api/waiter")
@PreAuthorize("hasAnyRole('WAITER','ADMIN')")
public class WaiterController {

    @GetMapping("/tables")
    public List<Map<String, Object>> viewTables() {
        // Placeholder data - wire this up to the real Table/Floor service module
        return List.of(
                Map.of("tableNo", 1, "status", "OCCUPIED", "guests", 4),
                Map.of("tableNo", 2, "status", "FREE", "guests", 0),
                Map.of("tableNo", 3, "status", "RESERVED", "guests", 2)
        );
    }

    @PostMapping("/orders")
    public Map<String, Object> takeOrder(@RequestBody Map<String, Object> orderPayload, Authentication auth) {
        // Placeholder - wire this up to the real Order service module
        return Map.of(
                "message", "Order received",
                "takenBy", auth.getName(),
                "order", orderPayload
        );
    }
}
