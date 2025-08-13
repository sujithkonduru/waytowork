package com.projecthouse.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "clientId", nullable = false)
    private User client;

    @ManyToOne
    @JoinColumn(name = "workerId", nullable = false)
    private User worker;

    // Basic details
    private String clientFirstName;
    private String clientLastName;
    private LocalDate bookingDate;
    private String phone;
    private String timeSlot;
    private String location;
    private String notes;

    private String status = "PENDING";
    private Integer rating;  // Changed from Integer to Double
    private String feedback;
    private String category;
}
