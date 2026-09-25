package com.smartinternship.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinternship.backend.model.Internship;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
}
