package com.projecthouse.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String password;
    private String address;
    private String phone;
    private String skills;
    private Double wage;
    private String driveLink;
    private String status;

    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(
        name = "users_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Collection<Role> roles;

    // ✅ Bi-directional mapping with Booking entity
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Booking> clientBookings;

    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL)
    private List<Booking> workerBookings;

    // ✅ Utility method for getting primary role
    public String getRole() {
        if (roles == null || roles.isEmpty()) return null;
        return roles.iterator().next().getName(); // Assuming one role per user
    }

    // Placeholder setters (if needed)
    public void setVerificationFilePath(String driveLink) {
        this.driveLink = driveLink;
    }

    public void setName(String name) {
        this.firstName = name; // or handle it differently
    }

    public User() {
        // No-arg constructor
    }

	public void setSkills(String skills) {
		this.skills = skills;
		// TODO Auto-generated method stub
		
	}

	public String getSkills() {
		// TODO Auto-generated method stub
		return this.skills;
	}
}
