package com.mg.leadmanagmentsystem.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.mg.leadmanagmentsystem.entity.Followup;

import java.util.List;

public interface FollowupRepository extends JpaRepository<Followup, Long> {
    List<Followup> findByLeadId(Long leadId);
}