package com.restaurant.restaurant_management.controller;

import com.restaurant.restaurant_management.dto.BillResponse;
import com.restaurant.restaurant_management.service.BillingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bills")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @PostMapping("/{orderId}")
    public BillResponse generateBill(
            @PathVariable Long orderId,
            @RequestParam(defaultValue = "0") double discount) {

        return billingService.generateBill(orderId, discount);
    }
}