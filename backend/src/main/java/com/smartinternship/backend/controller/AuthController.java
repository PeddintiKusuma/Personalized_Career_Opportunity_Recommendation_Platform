package com.smartinternship.backend.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartinternship.backend.dto.AuthResponse;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.StudentRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final StudentRepository studentRepository;

    public AuthController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Student incoming) {
        if (incoming.getEmail() == null || incoming.getPassword() == null || incoming.getName() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name, email and password are required"));
        }

        String email = incoming.getEmail().trim().toLowerCase();
        if (!isGmail(email)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Only Gmail addresses (@gmail.com) are allowed"));
        }
        if (studentRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists"));
        }

        Student student = new Student();
        student.setName(incoming.getName().trim());
        student.setEmail(email);
        student.setPassword(incoming.getPassword());
        student.setSkills(incoming.getSkills() == null ? "" : incoming.getSkills());
        student.setInterests(incoming.getInterests() == null ? "" : incoming.getInterests());
        student.setRole("STUDENT");
        student.setVerified(false);
        student.setVerificationToken(UUID.randomUUID().toString().replace("-", ""));

        studentRepository.save(student);

        AuthResponse response = new AuthResponse();
        response.setStudentId(student.getId());
        response.setEmail(student.getEmail());
        response.setName(student.getName());
        response.setRole(student.getRole());
        response.setVerified(false);
        response.setVerificationToken(student.getVerificationToken());
        response.setMessage("Account created. Please verify your email to continue.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student incoming) {
        if (incoming.getEmail() == null || incoming.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }

        String email = incoming.getEmail().trim().toLowerCase();
        if (!isGmail(email)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Only Gmail addresses (@gmail.com) are allowed"));
        }

        Student student = studentRepository.findByEmail(email)
                .orElse(null);

        if (student == null || student.getPassword() == null
                || !student.getPassword().equals(incoming.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        AuthResponse response = new AuthResponse();
        response.setStudentId(student.getId());
        response.setName(student.getName());
        response.setEmail(student.getEmail());
        response.setRole(student.getRole() == null ? "STUDENT" : student.getRole());
        response.setVerified(student.isVerified() || "ADMIN".equals(student.getRole()));
        response.setMessage("Login successful");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<?> verify(@PathVariable String token) {
        Student student = studentRepository.findByVerificationToken(token).orElse(null);
        if (student == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid or expired verification link"));
        }

        student.setVerified(true);
        student.setVerificationToken(null);
        studentRepository.save(student);

        return ResponseEntity.ok(Map.of("message", "Email verified successfully. You can now log in."));
    }

    private boolean isGmail(String email) {
        if (email == null || !email.endsWith("@gmail.com")) {
            return false;
        }
        String local = email.substring(0, email.length() - "@gmail.com".length());
        return !local.isBlank() && local.indexOf('@') < 0;
    }
}
