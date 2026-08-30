package com.restaurant.restaurant_management.repository;

import com.restaurant.restaurant_management.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}