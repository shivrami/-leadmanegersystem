package com.mg.leadmanagmentsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Lead name is required")
    private String leadName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "counselor_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Counselor counselor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_source_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private LeadSource leadSource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_status_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private LeadStatus leadStatus;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "lead_courses",
            joinColumns = @JoinColumn(name = "lead_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Courses> courses;

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
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLeadName() {
		return leadName;
	}
	public void setLeadName(String leadName) {
		this.leadName = leadName;
	}
	public Counselor getCounselor() {
		return counselor;
	}
	public void setCounselor(Counselor counselor) {
		this.counselor = counselor;
	}
	public LeadSource getLeadSource() {
		return leadSource;
	}
	public void setLeadSource(LeadSource leadSource) {
		this.leadSource = leadSource;
	}
	public LeadStatus getLeadStatus() {
		return leadStatus;
	}
	public void setLeadStatus(LeadStatus leadStatus) {
		this.leadStatus = leadStatus;
	}
	public List<Courses> getCourses() {
		return courses;
	}
	public void setCourses(List<Courses> courses) {
		this.courses = courses;
		calculateEstimatedValue();
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
	
	public Lead() {
		super();
	}
	public Lead(Long id, @NotNull(message = "Lead name is required") String leadName, Counselor counselor,
			LeadSource leadSource, LeadStatus leadStatus, List<Courses> courses, LocalDate leadDate, String location,
			String leadNotes, LocalDate createdDate, LocalDate updatedDate, Double estimatedValue, String contactNo,
			String email, String priority, String gender, String referral, LocalDate follow_up_date) {
		super();
		this.id = id;
		this.leadName = leadName;
		this.counselor = counselor;
		this.leadSource = leadSource;
		this.leadStatus = leadStatus;
		this.courses = courses;
		this.leadDate = leadDate;
		this.location = location;
		this.leadNotes = leadNotes;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
		this.estimatedValue = estimatedValue;
		this.contactNo = contactNo;
		this.email = email;
		this.priority = priority;
		this.gender = gender;
		this.referral = referral;
		this.follow_up_date = follow_up_date;
	}
	private void calculateEstimatedValue() {
	    if (courses != null) {
	        this.estimatedValue = courses.stream()
	            .mapToDouble(course -> course.getFee())
	            .sum();
	    } else {
	        this.estimatedValue = 0.0;
	    }
	}

	
	

   

}
