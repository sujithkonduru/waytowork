package com.projecthouse.Dto;

import lombok.Data;

@Data
public class UserRegistrationDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String role; // ROLE_WORKER or ROLE_CLIENT

    private String address;
    private String phone;
    private String skills;
    private Double wage;
    private String driveLink;
    private String status;
	

}
