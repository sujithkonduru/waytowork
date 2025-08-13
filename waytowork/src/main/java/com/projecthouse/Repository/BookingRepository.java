package com.projecthouse.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.projecthouse.Entity.Booking;
import com.projecthouse.Entity.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByClientId(Long clientId);
    List<Booking> findByWorkerId(Long workerId);
	List<Booking> findByWorker(User user);
	List<Booking> findByClient(User client);
}
