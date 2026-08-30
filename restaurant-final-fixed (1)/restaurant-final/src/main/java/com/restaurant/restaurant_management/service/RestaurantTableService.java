package com.restaurant.restaurant_management.service;
import com.restaurant.restaurant_management.entity.RestaurantTable;
import com.restaurant.restaurant_management.repository.RestaurantTableRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantTableService {
    private final RestaurantTableRepository repository;
    public RestaurantTableService(RestaurantTableRepository repository) {
        this.repository = repository;
    }
    public List<RestaurantTable> getAllTables() {
        return repository.findAll();
    }
    public RestaurantTable updateTableStatus(Long id, String status) {
        if (!status.equals("VACANT") &&
                !status.equals("OCCUPIED") &&
                !status.equals("BILLING")) {
            throw new RuntimeException(
                    "Invalid table status. Use VACANT, OCCUPIED or BILLING");
        }
        RestaurantTable table = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found"));
        table.setStatus(status);
        return repository.save(table);
    }
}