package com.smartinternship.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartinternship.backend.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    Optional<Application> findByStudentIdAndInternshipId(Long studentId, Long internshipId);
}
