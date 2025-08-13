
package com.projecthouse.Dto;

import java.time.LocalDate;

import lombok.Data;
@Data
public class BookingResponseDto {
    private Long bookingId;
    private String clientName;
    private String Phone;
    private LocalDate bookingDate;
    private String timeSlot;
    private String location;
    private String status;
    private Integer rating;
    private String feedback;

    // Constructor
    public BookingResponseDto(Long bookingId, String clientName, String Phone,
                              LocalDate bookingDate, String timeSlot, String location,
                              String status, Integer rating, String feedback) {
        this.bookingId = bookingId;
        this.clientName = clientName;
        this.Phone = Phone;
        this.bookingDate = bookingDate;
        this.timeSlot = timeSlot;
        this.location = location;
        this.status = status;
        this.rating = rating;
        this.feedback = feedback;
    }

    // Getters & Setters (or use Lombok @Data)
}
