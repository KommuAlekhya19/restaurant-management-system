package com.restaurant.restaurant_management.service;

import com.restaurant.restaurant_management.dto.BillResponse;
import com.restaurant.restaurant_management.entity.Order;
import com.restaurant.restaurant_management.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class BillingService {

    private final OrderRepository orderRepository;

    public BillingService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public BillResponse generateBill(Long orderId, double discountPercent) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Subtotal from order total amount (or calculate from items)
        double subtotal = order.getTotalAmount();
        
        // Calculate GST (e.g., 5% or 18%, let's assume 5% or 0 based on your app, let's keep standard calculation)
        double gst = subtotal * 0.05; // 5% GST example, change if needed
        
        // Calculate discount amount from percentage
        double discountAmount = (subtotal * discountPercent) / 100;

        // Final Amount calculation
        double finalAmount = (subtotal + gst) - discountAmount;

        // Matching BillResponse constructor: (Long orderId, Long tableId, double subtotal, double gst, double discount, double finalAmount)
        return new BillResponse(
            order.getId(), 
            order.getTableId(), 
            subtotal, 
            gst, 
            discountAmount, 
            finalAmount
        );
    }
}