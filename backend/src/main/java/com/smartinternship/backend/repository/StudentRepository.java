package com.smartinternship.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartinternship.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);

    Optional<Student> findByVerificationToken(String verificationToken);
}
