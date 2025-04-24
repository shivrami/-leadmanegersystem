package com.mg.leadmanagmentsystem.service;

import com.mg.dto.LeadRequestDTO;
import com.mg.dto.LeadResponseDTO;

import java.time.LocalDate;
import java.util.List;

public interface LeadService {

    LeadResponseDTO createLead(LeadRequestDTO leadRequestDTO);

    LeadResponseDTO updateLead(Long id, LeadRequestDTO leadRequestDTO);

    LeadResponseDTO getLeadById(Long id);

    List<LeadResponseDTO> getAllLeads();

    void deleteLead(Long id);
    
    LeadResponseDTO updateFollowupLead(Long id, LeadRequestDTO leadRequestDTO);
    LeadResponseDTO NextupdateFollowupLead(Long id, LeadRequestDTO leadRequestDTO);
}
