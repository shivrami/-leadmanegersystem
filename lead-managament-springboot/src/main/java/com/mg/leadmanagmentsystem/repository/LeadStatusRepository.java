package com.mg.leadmanagmentsystem.repository;

import com.mg.leadmanagmentsystem.entity.LeadStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadStatusRepository extends JpaRepository<LeadStatus, Long> {
}
