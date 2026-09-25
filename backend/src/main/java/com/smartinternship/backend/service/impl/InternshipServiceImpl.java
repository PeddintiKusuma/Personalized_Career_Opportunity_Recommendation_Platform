package com.smartinternship.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.repository.InternshipRepository;
import com.smartinternship.backend.service.InternshipService;

@Service
public class InternshipServiceImpl implements InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Override
    public Internship saveInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    @Override
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    @Override
    public void deleteInternship(Long id) {
        internshipRepository.deleteById(id);
    }
}
