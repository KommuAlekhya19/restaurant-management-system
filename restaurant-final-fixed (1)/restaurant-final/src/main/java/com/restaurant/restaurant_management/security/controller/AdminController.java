package com.restaurant.restaurant_management.security.controller;

import com.restaurant.restaurant_management.security.model.User;
import com.restaurant.restaurant_management.security.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Admin-only staff management endpoints.
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/staff")
    public List<Map<String, Object>> listStaff() {
        return userRepository.findAll().stream()
                .map(u -> Map.<String, Object>of(
                        "id", u.getId(),
                        "username", u.getUsername(),
                        "fullName", u.getFullName(),
                        "role", u.getRole().name(),
                        "enabled", u.isEnabled()
                ))
                .toList();
    }

    @PutMapping("/staff/{id}/disable")
    public Map<String, Object> disableStaff(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setEnabled(false);
        userRepository.save(user);
        return Map.of("id", id, "enabled", false, "message", "Staff account disabled");
    }
}
