package com.restaurant.restaurant_management.repository;

import com.restaurant.restaurant_management.entity.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
}