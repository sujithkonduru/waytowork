package com.projecthouse.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projecthouse.Entity.ForgotPassword;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword,Long> {
 Optional<ForgotPassword> findByToken(String token);
}
