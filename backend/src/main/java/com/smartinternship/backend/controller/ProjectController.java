package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.smartinternship.backend.model.Project;
import com.smartinternship.backend.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Add project
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }
}
