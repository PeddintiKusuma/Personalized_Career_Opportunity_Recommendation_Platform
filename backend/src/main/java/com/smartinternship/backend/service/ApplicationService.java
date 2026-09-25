package com.smartinternship.backend.service;

import java.util.List;

import com.smartinternship.backend.model.Application;

public interface ApplicationService {

    Application apply(Long studentId, Long internshipId);

    List<Application> getApplicationsByStudent(Long studentId);

    Application updateStatus(Long applicationId, String status);

    List<Application> getAllApplications();
}
