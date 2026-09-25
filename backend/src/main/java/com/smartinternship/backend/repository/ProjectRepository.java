package com.smartinternship.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartinternship.backend.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
