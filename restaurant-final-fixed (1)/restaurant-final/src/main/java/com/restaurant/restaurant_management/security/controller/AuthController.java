package com.restaurant.restaurant_management.security.controller;

import com.restaurant.restaurant_management.security.dto.*;
import com.restaurant.restaurant_management.security.model.User;
import com.restaurant.restaurant_management.security.repository.UserRepository;
import com.restaurant.restaurant_management.security.jwt.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                           PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    /**
     * POST /api/auth/login
     * Public endpoint. Validates credentials and, on success, issues a JWT
     * carrying the user's role as a claim.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

            LoginResponse response = new LoginResponse(
                    token, "Bearer", user.getUsername(), user.getFullName(),
                    user.getRole().name(), expirationMs
            );

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid username or password"));
        }
    }

    /**
     * POST /api/auth/register
     * ADMIN-only endpoint to onboard new staff (waiters, chefs, cashiers, other admins).
     * Protected via SecurityConfig ("/api/admin/**" style routes are separate;
     * this one is explicitly locked down with @PreAuthorize since it lives under /api/auth).
     */
    @PostMapping("/register")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, "Username already exists"));
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole())
                .enabled(true)
                .build();

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Staff account created: " + user.getUsername() + " (" + user.getRole() + ")"));
    }

    /**
     * POST /api/auth/register-customer
     * Public endpoint. Lets a customer self-register (unlike /register, which
     * is admin-only for onboarding staff). Role is always forced to CUSTOMER
     * server-side, regardless of any input, so this can never be used to
     * create staff/admin accounts.
     */
    @PostMapping("/register-customer")
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody CustomerRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, "Username already exists"));
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(com.restaurant.restaurant_management.security.model.Role.CUSTOMER)
                .enabled(true)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        LoginResponse response = new LoginResponse(
                token, "Bearer", user.getUsername(), user.getFullName(),
                user.getRole().name(), expirationMs
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PUT /api/auth/change-credentials
     * Lets the currently logged-in user change their own username and/or password.
     * Although this path falls under the "/api/auth/**" permitAll matcher in
     * SecurityConfig, @PreAuthorize enforces authentication independently at the
     * method level, so only a request with a valid JWT can actually use it.
     * The caller must confirm their current password to make the change.
     */
    @PutMapping("/change-credentials")
    @org.springframework.security.access.prepost.PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changeCredentials(@Valid @RequestBody ChangeCredentialsRequest request) {

        if ((request.getNewUsername() == null || request.getNewUsername().isBlank())
                && (request.getNewPassword() == null || request.getNewPassword().isBlank())) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Provide a new username, a new password, or both"));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        // Require the caller to re-confirm their current password before any change
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Current password is incorrect"));
        }

        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()
                && !request.getNewUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getNewUsername())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ApiResponse(false, "Username already exists"));
            }
            user.setUsername(request.getNewUsername());
        }

        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        userRepository.save(user);

        // Issue a fresh token since the username (a JWT claim) may have changed
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        LoginResponse response = new LoginResponse(
                token, "Bearer", user.getUsername(), user.getFullName(),
                user.getRole().name(), expirationMs
        );

        return ResponseEntity.ok(response);
    }
}
