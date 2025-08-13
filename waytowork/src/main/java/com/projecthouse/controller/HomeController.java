package com.projecthouse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projecthouse.Dto.UserProfileDto;
import com.projecthouse.interfaces.Userservice;

@RestController
@RequestMapping
@CrossOrigin(origins = "*") // Optional: Allow frontend to access
public class HomeController {

    @Autowired
    private Userservice userservice;

    @GetMapping("/")
    public String home() {
        return "index"; // Ensure index.html or index.html in templates is mapped correctly
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<Object> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(userservice.getProfile(userId));
    }

    @PutMapping("/profile/update")
    public ResponseEntity<String> updateProfile(@RequestBody UserProfileDto profileDto) {
        userservice.updateProfile(profileDto);
        return ResponseEntity.ok("Profile updated successfully");
    }
}
