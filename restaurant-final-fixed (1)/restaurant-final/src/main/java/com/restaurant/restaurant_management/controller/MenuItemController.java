package com.restaurant.restaurant_management.controller;

import com.restaurant.restaurant_management.entity.MenuItem;
import com.restaurant.restaurant_management.service.MenuItemService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
@CrossOrigin(origins = "http://localhost:3000") // React port ki permission kosam
public class MenuItemController {

    private final MenuItemService service;

    public MenuItemController(MenuItemService service) {
        this.service = service;
    }

    @GetMapping
    public List<MenuItem> getAllMenuItems() {
        return service.getAllMenuItems();
    }
}