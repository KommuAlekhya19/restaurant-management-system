package com.restaurant.restaurant_management.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ChangeCredentialsRequest {

    @NotBlank(message = "Current password is required")
    private String currentPassword;

    // Optional: only validated/applied if the caller wants to change their username
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String newUsername;

    // Optional: only validated/applied if the caller wants to change their password
    @Size(min = 6, message = "New password must be at least 6 characters")
    private String newPassword;

    public ChangeCredentialsRequest() {
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
