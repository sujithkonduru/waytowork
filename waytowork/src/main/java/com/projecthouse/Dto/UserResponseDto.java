
package com.projecthouse.Dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String role;
	

    // Getters and setters
}
