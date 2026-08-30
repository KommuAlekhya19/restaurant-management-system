package com.restaurant.restaurant_management.service;

import com.restaurant.restaurant_management.entity.MenuItem;
import com.restaurant.restaurant_management.repository.MenuItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemService {

    private final MenuItemRepository repository;

    public MenuItemService(MenuItemRepository repository) {
        this.repository = repository;
    }

    public List<MenuItem> getAllMenuItems() {
        return repository.findAll();
    }
}