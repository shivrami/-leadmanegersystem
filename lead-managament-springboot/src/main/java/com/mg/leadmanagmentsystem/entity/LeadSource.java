package com.mg.leadmanagmentsystem.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "lead_sources")
public class LeadSource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_name", nullable = false, unique = true)
    private String sourceName;

    // Constructors
    public LeadSource() {}

    public LeadSource(String sourceName) {
        this.sourceName = sourceName;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }
}
