package com.restaurant.restaurant_management.dto;

public class BillResponse {

    private Long orderId;
    private Long tableId;
    private double subtotal;
    private double gst;
    private double discount;
    private double finalAmount;

    public BillResponse() {
    }

    public BillResponse(Long orderId, Long tableId, double subtotal,
                        double gst, double discount, double finalAmount) {

        this.orderId = orderId;
        this.tableId = tableId;
        this.subtotal = subtotal;
        this.gst = gst;
        this.discount = discount;
        this.finalAmount = finalAmount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getTableId() {
        return tableId;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public double getGst() {
        return gst;
    }

    public double getDiscount() {
        return discount;
    }

    public double getFinalAmount() {
        return finalAmount;
    }
}