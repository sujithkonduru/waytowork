package com.projecthouse.interfaces;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.projecthouse.Dto.UserProfileDto;
import com.projecthouse.Dto.UserRegistrationDto;
import com.projecthouse.Entity.User;
import com.projecthouse.controller.LoginRequest;



public interface Userservice  {

    User save(UserRegistrationDto registrationDto);

    void saveWorker(UserRegistrationDto userDto);

    void saveClient(UserRegistrationDto userDto);
    
    void saveAdmin(UserRegistrationDto userDto);

	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

	boolean existsByEmail(String email);

	boolean existsByPhone(String phone);

	void saveWorker1(UserRegistrationDto userDto);

	ResponseEntity<?> authenticate(LoginRequest request, String string);

	void registerWorker(UserRegistrationDto userDto);
	void deleteUserById(Long id);

	void deleteRoleById(Long roleId);

	void updateProfile(UserProfileDto dto);

	UserProfileDto getProfile(Long userId);

	
	}





