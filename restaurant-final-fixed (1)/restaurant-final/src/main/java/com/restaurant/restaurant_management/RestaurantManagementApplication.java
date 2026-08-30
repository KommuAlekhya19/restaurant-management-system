package com.restaurant.restaurant_management;

import com.restaurant.restaurant_management.entity.RestaurantTable;
import com.restaurant.restaurant_management.entity.MenuItem;
import com.restaurant.restaurant_management.repository.MenuItemRepository;
import com.restaurant.restaurant_management.repository.RestaurantTableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestaurantManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestaurantManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner loadTables(RestaurantTableRepository repository, MenuItemRepository menuItemRepository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new RestaurantTable(1, 4, "VACANT"));
                repository.save(new RestaurantTable(2, 4, "VACANT"));
                repository.save(new RestaurantTable(3, 2, "VACANT"));
                repository.save(new RestaurantTable(4, 6, "VACANT"));
                repository.save(new RestaurantTable(5, 4, "VACANT"));
            }
            if (menuItemRepository.count() == 0) {
                menuItemRepository.save(
                        new MenuItem("Chicken Biryani", 200, "Main Course", "/images/chicken-biryani.jpg", true));

                menuItemRepository.save(
                        new MenuItem("Veg Biryani", 150, "Main Course", "/images/veg-biryani.jpg", true));

                menuItemRepository.save(
                        new MenuItem("Coke", 50, "Beverage", "/images/coke.jpg", true));

                menuItemRepository.save(
                        new MenuItem("Ice Cream", 80, "Dessert", "/images/ice-cream.jpg", true));
            }
        };
    }
}