package com.restaurant.restaurant_management.service;

import com.restaurant.restaurant_management.dto.CreateOrderRequest;
import com.restaurant.restaurant_management.dto.OrderItemRequest;
import com.restaurant.restaurant_management.entity.MenuItem;
import com.restaurant.restaurant_management.entity.Order;
import com.restaurant.restaurant_management.entity.OrderItem;
import com.restaurant.restaurant_management.entity.RestaurantTable;
import com.restaurant.restaurant_management.repository.MenuItemRepository;
import com.restaurant.restaurant_management.repository.OrderRepository;
import com.restaurant.restaurant_management.repository.RestaurantTableRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantTableRepository tableRepository;
    private final MenuItemRepository menuItemRepository;

    public OrderService(OrderRepository orderRepository,
                        RestaurantTableRepository tableRepository,
                        MenuItemRepository menuItemRepository) {

        this.orderRepository = orderRepository;
        this.tableRepository = tableRepository;
        this.menuItemRepository = menuItemRepository;
    }

    // Create a new restaurant order
    @Transactional
    public Order createOrder(CreateOrderRequest request) {

        // 1. Find the restaurant table
        RestaurantTable table = tableRepository.findById(request.getTableId())
                .orElseThrow(() -> new RuntimeException("Table not found"));

        // 2. Create a new order
        Order order = new Order(table, "PENDING");

        double totalAmount = 0;

        // 3. Process each ordered item
        for (OrderItemRequest itemRequest : request.getItems()) {

            // Find menu item
            MenuItem menuItem = menuItemRepository
                    .findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));

            // Check whether the food is available
            if (!menuItem.isAvailable()) {
                throw new RuntimeException(
                        "Menu item is not available: " + menuItem.getName()
                );
            }

            // Create order item
            OrderItem orderItem = new OrderItem(
                    order,
                    menuItem,
                    itemRequest.getQuantity(),
                    menuItem.getPrice()
            );

            // Add item to order
            order.getItems().add(orderItem);

            // Add item subtotal to order total
            totalAmount += orderItem.getSubtotal();
        }

        // 4. Store total order amount
        order.setTotalAmount(totalAmount);

        // 5. Change table status
        table.setStatus("OCCUPIED");
        tableRepository.save(table);

        // 6. Save order and order items
        return orderRepository.save(order);
    }


    // Fetch orders for the Kitchen Order Ticket (KOT)
    public List<Order> getKitchenOrders() {

        return orderRepository.findAll()
                .stream()
                .filter(order -> !order.getStatus().equals("SERVED"))
                .toList();
    }
    @Transactional
    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}