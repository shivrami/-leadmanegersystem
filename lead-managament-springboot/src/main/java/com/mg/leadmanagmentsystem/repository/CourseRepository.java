package com.mg.leadmanagmentsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg.leadmanagmentsystem.entity.Courses;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Integer> {
}
