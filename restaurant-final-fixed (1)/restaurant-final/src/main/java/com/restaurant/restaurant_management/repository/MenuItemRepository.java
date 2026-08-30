package com.restaurant.restaurant_management.repository;

import com.restaurant.restaurant_management.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
}