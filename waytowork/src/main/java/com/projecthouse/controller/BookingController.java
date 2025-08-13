package com.projecthouse.controller;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projecthouse.Dto.BookingRequest;
import com.projecthouse.Dto.BookingResponseDto;
import com.projecthouse.Dto.FeedbackRequest;
import com.projecthouse.Entity.Booking;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.BookingRepository;
import com.projecthouse.Repository.UserRepository;
import com.projecthouse.interfaces.BookingService;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // ✅ Create a booking
    @PostMapping("/create/{clientId}")
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest request,
            @PathVariable Long clientId) {
        try {
            Booking booking = bookingService.createBooking(request, clientId);
            return ResponseEntity.ok(Map.of(
                "message", "Booking successful",
                "bookingId", booking.getId()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Booking failed: " + e.getMessage());
        }
    }

    // ✅ Get all bookings by client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<?> getClientBookings(@PathVariable Long clientId) {
        Optional<User> clientOpt = userRepository.findById(clientId);
        if (clientOpt.isEmpty()) return ResponseEntity.status(404).body("Client not found");

        List<Booking> bookings = bookingRepository.findByClient(clientOpt.get());

        List<Map<String, Object>> bookingList = new ArrayList<>();
        for (Booking b : bookings) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", b.getId());
            map.put("bookingDate", b.getBookingDate());
            map.put("timeSlot", b.getTimeSlot());
            map.put("location", b.getLocation());
            map.put("status", b.getStatus());
            map.put("rating", b.getRating());
            map.put("feedback", b.getFeedback());

            if (b.getWorker() != null) {
                Map<String, Object> worker = new HashMap<>();
                worker.put("firstName", b.getWorker().getFirstName());
                worker.put("lastName", b.getWorker().getLastName());
                worker.put("phone", b.getWorker().getPhone());
                map.put("worker", worker);
            }

            bookingList.add(map);
        }

        return ResponseEntity.ok(bookingList);
    }

    // ✅ Get bookings by worker
    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByWorker(@PathVariable Long workerId) {
        List<Booking> bookings = bookingService.getBookingsByWorkerId(workerId);

        if (bookings == null || bookings.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<BookingResponseDto> response = bookings.stream()
            .map(booking -> {
                String clientName = booking.getClient().getFirstName() + " " + booking.getClient().getLastName();
                String phone = booking.getClient().getPhone();

                return new BookingResponseDto(
                    booking.getId(),
                    clientName,
                    phone,
                    booking.getBookingDate(),
                    booking.getTimeSlot(),
                    booking.getLocation(),
                    booking.getStatus(),
                    booking.getRating(),
                    booking.getFeedback()
                );
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // ✅ Cancel a booking
    @DeleteMapping("/cancel/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty())
            return ResponseEntity.status(404).body("Booking not found");

        Booking booking = optionalBooking.get();
        booking.setStatus("Cancelled");
        bookingRepository.save(booking);

        return ResponseEntity.ok("Booking cancelled");
    }

    // ✅ Submit feedback
    @PostMapping("/feedback/{bookingId}")
    public ResponseEntity<?> submitFeedback(
            @PathVariable Long bookingId,
            @RequestBody FeedbackRequest feedback) {

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
        if (optionalBooking.isEmpty())
            return ResponseEntity.status(404).body("Booking not found");

        Booking booking = optionalBooking.get();
        booking.setRating(feedback.getRating());
        booking.setFeedback(feedback.getFeedback());
        bookingRepository.save(booking);

        return ResponseEntity.ok("Feedback submitted");
    }
}
