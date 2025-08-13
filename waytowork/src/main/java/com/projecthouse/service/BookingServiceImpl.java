package com.projecthouse.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projecthouse.Dto.BookingRequest;
import com.projecthouse.Dto.FeedbackRequest;
import com.projecthouse.Entity.Booking;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.BookingRepository;
import com.projecthouse.Repository.UserRepository;
import com.projecthouse.interfaces.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

  
	@Autowired
    private BookingRepository bookingRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Booking createBooking(BookingRequest request, Long clientId) {
		 System.out.println("Client ID: " + clientId);
		    System.out.println("Worker ID: " + request.getWorkerId());
		
	    User client = userRepository.findById(clientId).orElseThrow(() -> new RuntimeException("Client not found"));
	    User worker = userRepository.findById(request.getWorkerId()).orElseThrow(() -> new RuntimeException("Worker not found"));

	    Booking booking = new Booking();
	    booking.setClient(client);
	    booking.setWorker(worker);
	    booking.setClientFirstName(client.getFirstName());
	    booking.setClientLastName(client.getLastName());
	    booking.setBookingDate(LocalDate.parse(request.getBookingDate()));
	    booking.setTimeSlot(request.getTimeSlot());
	    booking.setLocation(request.getLocation());
	    booking.setNotes(request.getNotes());
	    booking.setStatus("Pending");

	    return bookingRepository.save(booking);
	    
	}


 

	@Override
    public List<Booking> getBookingsByClient(Long clientId) {
        return bookingRepository.findByClientId(clientId);
    }

    @Override
    public List<Booking> getBookingsByWorker(Long workerId) {
        return bookingRepository.findByWorkerId(workerId);
    }

    @Override
    public List<Booking> getClientBookingsByClientId(Long clientId) {
        return bookingRepository.findByClientId(clientId);
    }

    @Override
    public List<Booking> getWorkerBookingsByWorkerId(Long workerId) {
        return bookingRepository.findByWorkerId(workerId);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }

    @Override
    public Booking updateStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Override
    public Booking addFeedback(Long bookingId, FeedbackRequest feedback) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        booking.setRating(feedback.getRating());
        booking.setFeedback(feedback.getFeedback());
        return bookingRepository.save(booking);
    }

    @Override
    public void bookWorker(BookingRequest request) {
        createBooking(request); // optional delegation
    }




	@Override
	public void createBooking(BookingRequest request) {
		// TODO Auto-generated method stub
		
	}




	@Override
	public List<Booking> getBookingsByClientId(Long clientId) {
		// TODO Auto-generated method stub
		return null;
	}




	@Override
	public List<Booking> getBookingsByWorkerId(Long workerId) {
	    List<Booking> bookings = bookingRepository.findByWorkerId(workerId);
	    return bookings != null ? bookings : new ArrayList<>();
	}







	


	
} 
