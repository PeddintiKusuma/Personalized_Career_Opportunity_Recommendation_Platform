package com.smartinternship.backend.service;

import java.util.List;
import com.smartinternship.backend.model.Student;

public interface StudentService {

    Student saveStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student incoming);
}
