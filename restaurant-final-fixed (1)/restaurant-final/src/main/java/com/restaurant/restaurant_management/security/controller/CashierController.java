package com.restaurant.restaurant_management.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Cashier/Admin capabilities: generate bills and reset tables after payment.
 */
@RestController
@RequestMapping("/api/cashier")
@PreAuthorize("hasAnyRole('CASHIER','ADMIN')")
public class CashierController {

    @PostMapping("/bill/{tableNo}")
    public Map<String, Object> generateBill(@PathVariable Integer tableNo) {
        // Placeholder - wire this up to the real Billing service module
        return Map.of(
                "tableNo", tableNo,
                "subtotal", 850.00,
                "tax", 42.50,
                "total", 892.50,
                "status", "BILL_GENERATED"
        );
    }

    @PostMapping("/tables/{tableNo}/reset")
    public Map<String, Object> resetTable(@PathVariable Integer tableNo) {
        // Placeholder - wire this up to the real Table/Floor service module
        return Map.of(
                "tableNo", tableNo,
                "status", "FREE",
                "message", "Table reset and ready for new guests"
        );
    }
}
