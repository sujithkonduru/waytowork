package com.projecthouse.controller;

import com.projecthouse.Entity.Booking;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.BookingRepository;
import com.projecthouse.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/worker/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/{workerId}")
    public ResponseEntity<Map<String, Object>> getWorkerDashboard(@PathVariable Long workerId) {
        Optional<User> optionalWorker = userRepository.findById(workerId);

        if (optionalWorker.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User worker = optionalWorker.get();

        // Fetch bookings for the worker
        List<Booking> bookings = bookingRepository.findByWorker(worker);

        // Total bookings
        long totalBookings = bookings.size();

        // Completed bookings
        long completed = bookings.stream()
                .filter(b -> "COMPLETED".equalsIgnoreCase(b.getStatus()))
                .count();

        // Average rating (exclude 0 ratings)
        double avgRating = bookings.stream()
                .mapToInt(Booking::getRating)
                .filter(r -> r > 0)
                .average()
                .orElse(0.0);

        // Booking details for response
        List<Map<String, Object>> bookingList = bookings.stream().map(b -> {
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("clientName", b.getClientFirstName() + " " + b.getClientLastName());
            bookingMap.put("date", b.getBookingDate() != null ? b.getBookingDate().toString() : "");
            bookingMap.put("category", b.getCategory());
            bookingMap.put("status", b.getStatus());
            bookingMap.put("feedback", b.getFeedback());
            bookingMap.put("rating", b.getRating());
            return bookingMap;
        }).collect(Collectors.toList());

        // Final response
        Map<String, Object> response = new HashMap<>();
        response.put("user", Map.of(
                "name", worker.getFirstName(),
                "email", worker.getEmail()
        ));
        response.put("bookings", bookingList);
        response.put("totalBookings", totalBookings);
        response.put("completed", completed);
        response.put("avgRating", avgRating);

        return ResponseEntity.ok(response);
    }
}
