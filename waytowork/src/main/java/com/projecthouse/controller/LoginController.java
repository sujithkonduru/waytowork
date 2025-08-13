package com.projecthouse.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projecthouse.Dto.UserRegistrationDto;
import com.projecthouse.Dto.UserResponseDto;
import com.projecthouse.Dto.WorkerDto;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.UserRepository;
import com.projecthouse.interfaces.Userservice;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

    @Autowired
    private Userservice userService;

    @Autowired
    private UserRepository userRepository;

    // ============ LOGIN ENDPOINTS (REST) ============

    @PostMapping("/client")
    public ResponseEntity<?> loginClient(@RequestBody LoginRequest request) {
        return handleLogin(request, "ROLE_CLIENT", "/client/dashboard");
    }

    @PostMapping("/worker")
    public ResponseEntity<?> loginWorker(@RequestBody LoginRequest request) {
        return handleLogin(request, "ROLE_WORKER", "/worker/dashboard");
    }

    @PostMapping("/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        if ("admin@example.com".equalsIgnoreCase(email) && "admin123".equals(password)) {
            return ResponseEntity.ok(Map.of(
                "message", "Admin login successful",
                "user", Map.of("email", email, "role", "ROLE_ADMIN"),
                "redirect", "/admin/dashboard"
            ));
        }

        return handleLogin(request, "ROLE_ADMIN", "/admin/dashboard");
    }

    private ResponseEntity<?> handleLogin(LoginRequest request, String role, String redirectUrl) {
        ResponseEntity<?> response = userService.authenticate(request, role);
        if (response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "user", response.getBody(),
                "redirect", redirectUrl
            ));
        }
        return response;
    }

    // ============ REGISTRATION ENDPOINT (REST) ============

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userDto) {
        String role = userDto.getRole();

        if (role == null || role.isBlank()) {
            return ResponseEntity.badRequest().body("Role is required.");
        }

        role = role.toUpperCase().startsWith("ROLE_") ? role.toUpperCase() : "ROLE_" + role.toUpperCase();
        userDto.setRole(role);

        if (userService.existsByEmail(userDto.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        if (userService.existsByPhone(userDto.getPhone())) {
            return ResponseEntity.badRequest().body("Phone number already exists.");
        }

        String password = userDto.getPassword();
        String passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";

        if (password == null || !password.matches(passwordPattern)) {
            return ResponseEntity.badRequest().body("Password must contain uppercase, lowercase, digit, special character, and be at least 8 characters long.");
        }

        switch (role) {
            case "ROLE_WORKER":
                if (userDto.getSkills() == null || userDto.getSkills().isBlank()) {
                    return ResponseEntity.badRequest().body("Skills are required for workers.");
                }
                if (userDto.getWage() == null || userDto.getWage() <= 0) {
                    return ResponseEntity.badRequest().body("Wage must be greater than 0.");
                }
                if (userDto.getDriveLink() == null || userDto.getDriveLink().isBlank()) {
                    return ResponseEntity.badRequest().body("Google Drive verification link is required for workers.");
                }
                userService.saveWorker(userDto);
                return ResponseEntity.ok("Worker registered successfully.");

            case "ROLE_CLIENT":
                userService.saveClient(userDto);
                return ResponseEntity.ok("Client registered successfully.");

            case "ROLE_ADMIN":
                userService.saveAdmin(userDto);
                return ResponseEntity.ok("Admin registered successfully.");

            default:
                return ResponseEntity.badRequest().body("Invalid role selected.");
        }
    }

    // ============ SERVER-SIDE WORKER REGISTRATION (Thymeleaf) ============

    @GetMapping("/register/worker")
    public String showWorkerRegistrationForm(Model model) {
        model.addAttribute("user", new UserRegistrationDto());
        return "register-worker";
    }

    @PostMapping("/register/worker")
    public String registerWorker(
            @ModelAttribute("user") UserRegistrationDto userDto,
            Model model) {

        if (userService.existsByEmail(userDto.getEmail())) {
            model.addAttribute("error", "Email already exists");
            return "register-worker";
        }

        if (userService.existsByPhone(userDto.getPhone())) {
            model.addAttribute("error", "Phone number already exists");
            return "register-worker";
        }

        String password = userDto.getPassword();
        String passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$";

        if (password == null || !password.matches(passwordPattern)) {
            model.addAttribute("error", "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and be at least 8 characters long.");
            return "register-worker";
        }

        if (userDto.getDriveLink() == null || userDto.getDriveLink().trim().isEmpty()) {
            model.addAttribute("error", "Please provide a Google Drive verification link.");
            return "register-worker";
        }

        userDto.setRole("ROLE_WORKER");
        userService.registerWorker(userDto);

        return "redirect:/login/worker?success";
    }

    // ============ SERVER-SIDE CLIENT REGISTRATION (Thymeleaf) ============

    @GetMapping("/register/client")
    public String showClientRegistrationForm(Model model) {
        model.addAttribute("user", new UserRegistrationDto());
        return "register-client";
    }

    @PostMapping("/register/client")
    public String registerClient(@ModelAttribute("user") UserRegistrationDto userDto, Model model) {
        userDto.setRole("ROLE_CLIENT");
        userService.saveClient(userDto);
        return "redirect:/login/client?success";
    }

    // ============ WORKERS FOR CLIENT DASHBOARD ============

    @GetMapping("/workers")
    public ResponseEntity<List<WorkerDto>> getAvailableWorkers() {
        List<User> workers = userRepository.findByRoleAndStatus("ROLE_WORKER", "ACTIVE");

        List<WorkerDto> workerDtos = workers.stream().map(worker -> {
            WorkerDto dto = new WorkerDto();
            dto.setWorkerId(worker.getId());
            dto.setFirstName(worker.getFirstName());
            dto.setLastName(worker.getLastName());
            dto.setAddress(worker.getAddress());
            dto.setPhone(worker.getPhone());
            dto.setSkills(worker.getSkills());
            dto.setWage(worker.getWage());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(workerDtos);
    }

    // ============ USERS FOR ADMIN DASHBOARD ============

    @GetMapping("/admin/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<User> users = userRepository.findAll();

        List<UserResponseDto> userDtos = users.stream().map(user -> {
            UserResponseDto dto = new UserResponseDto();
            dto.setId(user.getId());
            dto.setEmail(user.getEmail());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setPhone(user.getPhone());

            String roleName = user.getRoles().stream()
                    .findFirst()
                    .map(role -> role.getName())
                    .orElse("UNKNOWN");

            dto.setRole(roleName);
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(userDtos);
    }

    // ============ WORKERS BY SKILL ============

    @GetMapping("/workers/category/{skill}")
    public ResponseEntity<List<User>> getWorkersBySkill(@PathVariable String skill) {
        List<User> workers = userRepository.findBySkillsIgnoreCase(skill);
        return ResponseEntity.ok(workers);
    }
    @DeleteMapping("/admin/delete/{userid}")
    public ResponseEntity<String> deleteUser(@PathVariable("userid") Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

}
