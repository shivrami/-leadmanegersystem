package com.mg.leadmanagmentsystem.repository;

import com.mg.leadmanagmentsystem.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead,Long> {

    // Custom query methods if needed
    List<Lead> findByLeadNameContainingIgnoreCase(String leadName);

    List<Lead> findByPriority(String priority);

    List<Lead> findByCounselorId(Long counselorId);
}
