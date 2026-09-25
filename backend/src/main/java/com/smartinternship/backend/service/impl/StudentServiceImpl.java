package com.smartinternship.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.StudentRepository;
import com.smartinternship.backend.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student updateStudent(Long id, Student incoming) {
        return studentRepository.findById(id).map(existing -> {
            if (incoming.getName() != null) {
                existing.setName(incoming.getName());
            }
            if (incoming.getSkills() != null) {
                existing.setSkills(incoming.getSkills());
            }
            if (incoming.getInterests() != null) {
                existing.setInterests(incoming.getInterests());
            }
            return studentRepository.save(existing);
        }).orElse(null);
    }
}
