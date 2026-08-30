package com.restaurant.restaurant_management.controller;

import com.restaurant.restaurant_management.dto.CreateOrderRequest;
import com.restaurant.restaurant_management.entity.Order;
import com.restaurant.restaurant_management.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody CreateOrderRequest request) {

        Order order = service.createOrder(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(order);
    }

    @GetMapping("/kot")
    public List<Order> getKitchenOrders() {
        return service.getKitchenOrders();
    }

    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateOrderStatus(id, status);
    }
}