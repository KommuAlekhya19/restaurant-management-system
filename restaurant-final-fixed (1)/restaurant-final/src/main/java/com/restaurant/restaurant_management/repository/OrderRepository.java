package com.restaurant.restaurant_management.repository;

import com.restaurant.restaurant_management.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}