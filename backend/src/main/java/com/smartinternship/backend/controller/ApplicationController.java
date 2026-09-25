package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartinternship.backend.model.Application;
import com.smartinternship.backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Apply internship
    @PostMapping
    public Application apply(@RequestParam Long studentId,
                             @RequestParam Long internshipId) {
        return applicationService.apply(studentId, internshipId);
    }
    
    @PutMapping("/{id}/status")
    public Application updateStatus(@PathVariable Long id,
                                    @RequestParam String status) {
        return applicationService.updateStatus(id, status);
    }


    @GetMapping("/student/{studentId}")
    public List<Application> getByStudent(@PathVariable Long studentId) {
        return applicationService.getApplicationsByStudent(studentId);
    }

    @GetMapping
    public List<Application> getAll() {
        return applicationService.getAllApplications();
    }
}
