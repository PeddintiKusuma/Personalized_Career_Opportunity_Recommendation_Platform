package com.smartinternship.backend.service;

import java.util.List;
import com.smartinternship.backend.model.Internship;

public interface InternshipService {

    Internship saveInternship(Internship internship);

    List<Internship> getAllInternships();

    void deleteInternship(Long id);
}
