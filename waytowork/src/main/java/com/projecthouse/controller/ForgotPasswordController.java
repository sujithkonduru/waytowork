
package com.projecthouse.controller;

import com.projecthouse.Dto.MailBody;
import com.projecthouse.Entity.ForgotPassword;
import com.projecthouse.Entity.User;
import com.projecthouse.Repository.ForgotPasswordRepository;
import com.projecthouse.Repository.UserRepository;
import com.projecthouse.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Controller
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private EmailService emailService;

    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password";
    }

    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email, Model model) {
        System.out.println("Email received: " + email);
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = UUID.randomUUID().toString();

            ForgotPassword forgotPassword = new ForgotPassword();
            forgotPassword.setToken(token);
            forgotPassword.setUser(user);
            forgotPassword.setExpiryDate(LocalDateTime.now().plusMinutes(30));
            forgotPasswordRepository.save(forgotPassword);

            String resetLink = "http://localhost:3000/reset-password?token=" + token;

            MailBody mailBody = new MailBody(
                    user.getEmail(),
                    "Reset Your Password",
                    "Click the link below to reset your password:\n" + resetLink
            );

            emailService.sendSimpleMessage(mailBody);
            model.addAttribute("message", "Password reset link sent to your email.");
        } else {
            model.addAttribute("error", "No user found with that email.");
        }

        return "forgot-password";
    }

    // ✅ Display Reset Password Form
    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        Optional<ForgotPassword> tokenOpt = forgotPasswordRepository.findByToken(token);

        if (tokenOpt.isPresent() && tokenOpt.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            model.addAttribute("token", token);
            return "reset-password"; // Thymeleaf form to enter new password
        } else {
            model.addAttribute("error", "Invalid or expired token.");
            return "forgot-password";
        }
    }

    // ✅ Handle Password Reset Submission
    @PostMapping("/reset-password")
    public String handleResetPassword(@RequestParam("token") String token,
                                      @RequestParam("password") String newPassword,
                                      Model model) {
    	System.out.println("Token: "+token);
    	System.out.println("New Password: "+ newPassword);
        Optional<ForgotPassword> tokenOpt = forgotPasswordRepository.findByToken(token);

        if (tokenOpt.isPresent() && tokenOpt.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = tokenOpt.get().getUser();
            user.setPassword(newPassword); // 🔐 Make sure to encode the password using passwordEncoder
            userRepository.save(user);
            model.addAttribute("message", "Password reset successfully.");
            return "login";
        } else {
            model.addAttribute("error", "Invalid or expired token.");
            return "forgot-password";
        }
    }
}
