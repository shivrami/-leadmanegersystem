package com.mg.leadmanagmentsystem.repository;

import com.mg.dto.LeadResponseDTO;
import com.mg.leadmanagmentsystem.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead,Long>,JpaSpecificationExecutor<Lead> {

    // Custom query methods if needed
    List<Lead> findByLeadNameContainingIgnoreCase(String leadName);

    List<Lead> findByPriority(String priority);

    List<Lead> findByCounselorId(Long counselor);
    
    List<Lead> findByLeadStatusId(Long leadStatus);

   

    List<Lead> findByLeadSourceId(Long leadSource);

    List<Lead> findByCoursesId(Long courses);

}
