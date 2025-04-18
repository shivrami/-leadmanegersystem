package com.mg.leadmanagmentsystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mg.leadmanagmentsystem.entity.Courses;
import com.mg.leadmanagmentsystem.service.CourseService;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000") 
public class CourseController {

    @Autowired
    private CourseService courseService;

 
    @GetMapping
    public ResponseEntity<List<Courses>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }


    @GetMapping("/{id}")
    public ResponseEntity<Courses> getCourseById(@PathVariable int id) {
        Courses course = courseService.getCourseById(id);
        return (course != null) ? ResponseEntity.ok(course) : ResponseEntity.notFound().build();
    }

  
    @PostMapping
    public ResponseEntity<Courses> addCourse(@RequestBody Courses course) {
        return ResponseEntity.ok(courseService.addCourse(course));
    }

    // ✅ Update a course
    @PutMapping("/{id}")
    public ResponseEntity<Courses> updateCourse(@PathVariable int id, @RequestBody Courses courseDetails) {
        Courses updatedCourse = courseService.updateCourse(id, courseDetails);
        return (updatedCourse != null) ? ResponseEntity.ok(updatedCourse) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable int id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
