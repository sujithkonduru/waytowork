package com.projecthouse.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.projecthouse.Dto.UserProfileDto;
import com.projecthouse.Dto.UserRegistrationDto;
import com.projecthouse.Entity.Role;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.RoleRepository;
import com.projecthouse.Repository.UserRepository;
import com.projecthouse.controller.LoginRequest;
import com.projecthouse.interfaces.Userservice;

@Service
public class UserserviceImpl implements Userservice, UserDetailsService {

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public User save(UserRegistrationDto registrationDto) {
        return createUserWithRole(registrationDto, registrationDto.getRole());
    }

    @Override
    public void saveWorker(UserRegistrationDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail()) || userRepository.existsByPhone(userDto.getPhone())) {
            throw new IllegalArgumentException("Duplicate email or phone number.");
        }

        if (userDto.getSkills() == null || userDto.getSkills().isEmpty() ||
            userDto.getWage() == null || userDto.getDriveLink() == null || userDto.getDriveLink().isEmpty()) {
            throw new IllegalArgumentException("Skills, Wage, and Drive Link are required for Workers.");
        }

        userDto.setRole("ROLE_WORKER");
        createUserWithRole(userDto, "ROLE_WORKER");
    }

    @Override
    public void saveClient(UserRegistrationDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail()) || userRepository.existsByPhone(userDto.getPhone())) {
            throw new IllegalArgumentException("Duplicate email or phone number.");
        }

        userDto.setRole("ROLE_CLIENT");
        createUserWithRole(userDto, "ROLE_CLIENT");
    }

    @Override
    public void saveAdmin(UserRegistrationDto dto) {
        if (userRepository.existsByEmail(dto.getEmail()) || userRepository.existsByPhone(dto.getPhone())) {
            throw new IllegalArgumentException("Duplicate email or phone number.");
        }

        dto.setRole("ROLE_ADMIN");
        createUserWithRole(dto, "ROLE_ADMIN");
    }

    private User createUserWithRole(UserRegistrationDto userDto, String roleName) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setAddress(userDto.getAddress());
        user.setPhone(userDto.getPhone());
        user.setSkills(userDto.getSkills());
        user.setWage(userDto.getWage());
        user.setVerificationFilePath(userDto.getDriveLink());
        user.setStatus("ACTIVE");

        Optional<Role> roleOptional = roleRepository.findByName(roleName);
        Role role;

        if (roleOptional.isPresent()) {
            role = roleOptional.get();
        } else {
            Role newRole = new Role();
            newRole.setName(roleName);
            roleRepository.save(newRole);
            role = roleRepository.findByName(roleName).orElseThrow();
        }

        user.setRoles(Collections.singletonList(role));
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        User user = optionalUser.get();
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles())
        );
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    @Override
    public void saveWorker1(UserRegistrationDto userDto) {
        // TODO: Unused - consider removing
    }

    @Override
    public ResponseEntity<?> authenticate(LoginRequest request, String roleName) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("UserDto not found with given email.");
        }

        User user = optionalUser.get();

        boolean hasRole = user.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase(roleName));
        if (!hasRole) {
            return ResponseEntity.badRequest().body("UserDto does not have role: " + roleName);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("email", user.getEmail());
        response.put("role", roleName);

        return ResponseEntity.ok(response);
    }

    @Override
    public void registerWorker(UserRegistrationDto userDto) {
        // TODO Auto-generated method stub
    }

    // ✅ New method to safely delete a role
    @Override
    public void deleteUserById(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.getRoles().clear();  // ✅ This clears join table entries
            userRepository.save(user);
            userRepository.deleteById(user.getId());
        }
    }

	@Override
	public void deleteRoleById(Long roleId) {
		// TODO Auto-generated method stub
		
	}
	// UserServiceImpl.java

	@Override
	public  UserProfileDto getProfile(Long userId) {
	    User user = userRepository.findById(userId)
	        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	    UserProfileDto dto = new UserProfileDto();
	    dto.setId(user.getId());
	    dto.setPhone(user.getPhone());
	    dto.setAddress(user.getAddress());
	    dto.setSkills(user.getSkills());
	    dto.setWage(user.getWage());
	    dto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
	    return dto;
	}

	@Override
	public void updateProfile(UserProfileDto dto) {
	    User user = userRepository.findById(dto.getId())
	        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	    user.setPhone(dto.getPhone());
	    user.setAddress(dto.getAddress());

	    // If user has WORKER role, allow skill and wage to update
	    boolean isWorker = user.getRoles().stream()
	        .anyMatch(role -> role.getName().equalsIgnoreCase("WORKER"));

	    if (isWorker) {
	        user.setSkills(dto.getSkills());
	        user.setWage(dto.getWage());
	    }

	    userRepository.save(user);
	}


}
