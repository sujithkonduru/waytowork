package com.projecthouse.interfaces;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.projecthouse.Dto.BookingRequest;
import com.projecthouse.Dto.FeedbackRequest;
import com.projecthouse.Entity.Booking;

public interface BookingService {

    void createBooking(BookingRequest request);

    List<Booking> getClientBookingsByClientId(Long clientId);

    List<Booking> getWorkerBookingsByWorkerId(Long workerId);

	Object addFeedback(Long bookingId, FeedbackRequest feedback);

	Object updateStatus(Long bookingId, String status);

	void cancelBooking(Long bookingId);

	void bookWorker(BookingRequest request);

	List<Booking> getBookingsByClientId(Long clientId);

	List<Booking> getBookingsByWorkerId(Long workerId);

	Booking createBooking(BookingRequest request, Long clientId);

	List<Booking> getBookingsByClient(Long clientId);

	List<Booking> getBookingsByWorker(Long workerId);

   

	
}
