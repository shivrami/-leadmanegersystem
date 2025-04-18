package com.mg.leadmanagmentsystem.service;


import java.util.List;

import com.mg.leadmanagmentsystem.entity.Courses;

public interface CourseService {
    List<Courses> getAllCourses();
    Courses getCourseById(int id);
    Courses addCourse(Courses course);
    Courses updateCourse(int id, Courses course);
    void deleteCourse(int id);
}
