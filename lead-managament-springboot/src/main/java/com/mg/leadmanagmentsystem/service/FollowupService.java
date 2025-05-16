package com.mg.leadmanagmentsystem.service;

import com.mg.dto.FollowupRequestDTO;
import com.mg.dto.FollowupResponseDTO;
import com.mg.dto.LeadRequestDTO;
import com.mg.dto.LeadResponseDTO;
import com.mg.leadmanagmentsystem.entity.Followup;
import com.mg.leadmanagmentsystem.entity.Lead;
import com.mg.leadmanagmentsystem.repository.FollowupRepository;
import com.mg.leadmanagmentsystem.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowupService {

    @Autowired
    private FollowupRepository followupRepository;

    @Autowired
    private LeadRepository leadRepository;

    // Create a Followup for a specific Lead
    public FollowupResponseDTO createFollowup(Long leadId, FollowupRequestDTO followupRequestDTO) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        Followup followup = new Followup();
        followup.setLead(lead);
        followup.setDescription(followupRequestDTO.getDescription());
        followup.setFollowUpDate(followupRequestDTO.getFollowUpDate());

        Followup savedFollowup = followupRepository.save(followup);

        FollowupResponseDTO responseDTO = new FollowupResponseDTO();
        responseDTO.setId(savedFollowup.getId());
        responseDTO.setLeadId(savedFollowup.getLead().getId()); // leadId should be Long, not int
        responseDTO.setDescription(savedFollowup.getDescription());
        responseDTO.setFollowUpDate(savedFollowup.getFollowUpDate());

        return responseDTO;
    }
    
    

    // Get all followups for a specific lead
    public List<FollowupResponseDTO> getFollowupsByLeadId(Long leadId) {
        List<Followup> followups = followupRepository.findByLeadId(leadId);

        return followups.stream().map(followup -> {
            FollowupResponseDTO responseDTO = new FollowupResponseDTO();
            responseDTO.setId(followup.getId());
            responseDTO.setLeadId(followup.getLead().getId()); // leadId should be Long, not int
            responseDTO.setDescription(followup.getDescription());
            responseDTO.setFollowUpDate(followup.getFollowUpDate());
            return responseDTO;
        }).collect(Collectors.toList());
    }
    
    public FollowupResponseDTO updateNextFollowupLead(Long leadId, FollowupRequestDTO dto) {
        
        Lead lead = leadRepository.findById(leadId)
            .orElseThrow(() -> new RuntimeException("Lead not found with id: " + leadId));

      
        lead.setFollowUpDate(dto.getFollowUpDate());

       
        Lead updatedLead = leadRepository.save(lead);

     
        FollowupResponseDTO responseDTO = new FollowupResponseDTO();
        responseDTO.setId(updatedLead.getId());               // here we're reusing the Lead ID
        responseDTO.setLeadId(updatedLead.getId());
        responseDTO.setFollowUpDate(updatedLead.getFollowUpDate());
      
        return responseDTO;
    }
    
}
