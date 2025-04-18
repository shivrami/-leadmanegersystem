package com.mg.leadmanagmentsystem.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Courses {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "course_description", nullable = false)
    private String courseDescription;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "fee", nullable = false)
    private int fee;

    
    public Courses() {}

    public Courses(String courseName, String courseDescription, int duration, int fee) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.duration = duration;
        this.fee = fee;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getFee() {
        return fee;
    }

    public void setFee(int fee) {
        this.fee = fee;
    }
}
