package com.mg.leadmanagmentsystem.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mg.leadmanagmentsystem.entity.Courses;
import com.mg.leadmanagmentsystem.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Courses> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Courses getCourseById(int id) {
        Optional<Courses> course = courseRepository.findById(id);
        return course.orElse(null);
    }

    @Override
    public Courses addCourse(Courses course) {
        return courseRepository.save(course);
    }

    @Override
    public Courses updateCourse(int id, Courses courseDetails) {
    	Courses existingCourse = getCourseById(id);
        if (existingCourse != null) {
            existingCourse.setCourseName(courseDetails.getCourseName());
            existingCourse.setCourseDescription(courseDetails.getCourseDescription());
            existingCourse.setDuration(courseDetails.getDuration());
            existingCourse.setFee(courseDetails.getFee());
            return courseRepository.save(existingCourse);
        }
        return null;
    }

    @Override
    public void deleteCourse(int id) {
        courseRepository.deleteById(id);
    }
}
