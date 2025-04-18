package com.mg.leadmanagmentsystem.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mg.leadmanagmentsystem.entity.LeadSource;

@Repository
public interface LeadSourceRepository extends JpaRepository<LeadSource, Long> {
    boolean existsBySourceName(String sourceName);
}
