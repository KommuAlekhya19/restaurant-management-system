package com.restaurant.restaurant_management.security.model;

/**
 * Staff roles recognised by the system.
 * Spring Security authorities are derived as "ROLE_" + name(), e.g. ROLE_WAITER.
 */
public enum Role {
    WAITER,   // can view tables and take orders
    CHEF,     // can view KOT (Kitchen Order Ticket) and update food status
    CASHIER,  // can generate bills and reset tables
    ADMIN,    // full access - includes cashier's billing/reset abilities
    CUSTOMER  // self-service: browse menu, place own orders, view own order history
}
