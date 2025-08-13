package com.projecthouse.Dto;

import java.util.Set;

import lombok.Data;

@Data
public class UserProfileDto {
	
	 private Long id;
	    private String phone;
	    private String address;
	    private String skills;
	    private Double wage;
	    private Set<String> roles; 

}
