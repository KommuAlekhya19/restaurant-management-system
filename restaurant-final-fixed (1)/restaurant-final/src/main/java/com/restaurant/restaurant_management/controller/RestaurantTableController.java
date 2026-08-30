package com.restaurant.restaurant_management.controller;

import com.restaurant.restaurant_management.entity.RestaurantTable;
import com.restaurant.restaurant_management.service.RestaurantTableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class RestaurantTableController {

    private final RestaurantTableService service;

    public RestaurantTableController(RestaurantTableService service) {
        this.service = service;
    }

    @GetMapping
    public List<RestaurantTable> getAllTables() {
        return service.getAllTables();
    }

    @PutMapping("/{id}/status")
    public RestaurantTable updateTableStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return service.updateTableStatus(id, status);
    }
}