package com.mg.dto;

import java.time.LocalDate;
import java.util.List;

public class LeadResponseDTO {
    private Long id;
    private String leadName;
    private int counselorId; // Changed to Long for consistency
    private Long leadSourceId;
    private Long leadStatusId;
    
    private List<Integer> courseIds;
    private String counselorUserName;
    private String leadSourceName;
    private String leadStatusName;
    private List<String> courseNames;
    private LocalDate leadDate;
    private String location;
    private String leadNotes;
    private LocalDate createdDate;
    private LocalDate updatedDate;
    private Double estimatedValue;

    private String contactNo;      
    private String email;         
    private String priority;        
    private String gender;          
    private String referral;   
    private LocalDate follow_up_date;    

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeadName() {
        return leadName;
    }

    public void setLeadName(String leadName) {
        this.leadName = leadName;
    }

    public int getCounselorId() {
        return counselorId;
    }

    public void setCounselorId(int counselorId) { // Changed to Long for consistency
        this.counselorId = counselorId;
    }

    public Long getLeadSourceId() {
        return leadSourceId;
    }

    public void setLeadSourceId(Long leadSourceId) {
        this.leadSourceId = leadSourceId;
    }

    public Long getLeadStatusId() {
        return leadStatusId;
    }

    public void setLeadStatusId(Long leadStatusId) {
        this.leadStatusId = leadStatusId;
    }

    public List<Integer> getCourseIds() {
        return courseIds;
    }

    public void setCourseIds(List<Integer> courseIds) {
        this.courseIds = courseIds;
    }

    public String getCounselorUserName() {
        return counselorUserName;
    }

    public void setCounselorUserName(String counselorUserName) {
        this.counselorUserName = counselorUserName;
    }

    public String getLeadSourceName() {
        return leadSourceName;
    }

    public void setLeadSourceName(String leadSourceName) {
        this.leadSourceName = leadSourceName;
    }

    public String getLeadStatusName() {
        return leadStatusName;
    }

    public void setLeadStatusName(String leadStatusName) {
        this.leadStatusName = leadStatusName;
    }

    public List<String> getCourseNames() {
        return courseNames;
    }

    public void setCourseNames(List<String> courseNames) {
        this.courseNames = courseNames;
    }

    public LocalDate getLeadDate() {
        return leadDate;
    }

    public void setLeadDate(LocalDate leadDate) {
        this.leadDate = leadDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLeadNotes() {
        return leadNotes;
    }

    public void setLeadNotes(String leadNotes) {
        this.leadNotes = leadNotes;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Double getEstimatedValue() {
        return estimatedValue;
    }

    public void setEstimatedValue(Double estimatedValue) {
        this.estimatedValue = estimatedValue;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getReferral() {
        return referral;
    }

    public void setReferral(String referral) {
        this.referral = referral;
    }

    public LocalDate getFollow_up_date() {
        return follow_up_date;
    }

    public void setFollow_up_date(LocalDate follow_up_date) {
        this.follow_up_date = follow_up_date;
    }
}
