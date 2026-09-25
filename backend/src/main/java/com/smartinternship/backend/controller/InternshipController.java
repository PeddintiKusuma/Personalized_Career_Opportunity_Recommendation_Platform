package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.service.InternshipService;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin("*")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    // POST – add internship
    @PostMapping
    public Internship addInternship(@RequestBody Internship internship) {
        return internshipService.saveInternship(internship);
    }

    @GetMapping
    public List<Internship> getAllInternships() {
        return internshipService.getAllInternships();
    }

    @DeleteMapping("/{id}")
    public void deleteInternship(@PathVariable Long id) {
        internshipService.deleteInternship(id);
    }
}
