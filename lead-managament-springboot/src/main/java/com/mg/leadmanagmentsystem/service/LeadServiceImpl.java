package com.mg.leadmanagmentsystem.service;

import com.mg.dto.LeadRequestDTO;
import com.mg.dto.LeadResponseDTO;
import com.mg.leadmanagmentsystem.entity.*;
import com.mg.leadmanagmentsystem.repository.*;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LeadServiceImpl implements LeadService {
	
	private final ModelMapper modelMapper;

    @Autowired
    public LeadServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private CounselorRepository counselorRepository;

    @Autowired
    private LeadSourceRepository leadSourceRepository;

    @Autowired
    private LeadStatusRepository leadStatusRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public LeadResponseDTO createLead(LeadRequestDTO dto) {
        Lead lead = convertToEntity(dto);
        lead.setCreatedDate(LocalDate.now());
        lead.setUpdatedDate(LocalDate.now());
        lead = leadRepository.save(lead);
        return convertToDto(lead);
    }

    @Override
    public LeadResponseDTO updateLead(Long id, LeadRequestDTO dto) {
        Lead existing = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));

        // Update the fields
        existing.setLeadName(dto.getLeadName());
        existing.setLeadDate(dto.getLeadDate());
        existing.setLocation(dto.getLocation());
        existing.setLeadNotes(dto.getLeadNotes());
        existing.setEstimatedValue(dto.getEstimatedValue());
        existing.setUpdatedDate(LocalDate.now());
        existing.setFollowUpDate(dto.getFollow_up_date());

        // Update associated entities
        updateLeadAssociations(existing, dto);

        Lead updatedLead = leadRepository.save(existing);
        return convertToDto(updatedLead);
    }

    @Override
    public LeadResponseDTO getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));
        return convertToDto(lead);
    }

    @Override
    public List<LeadResponseDTO> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLead(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead not found with id: " + id);
        }
        leadRepository.deleteById(id);
    }

    private Lead convertToEntity(LeadRequestDTO dto) {
        Lead lead = new Lead();
        lead.setLeadName(dto.getLeadName());
        lead.setLeadDate(dto.getLeadDate());
        lead.setLocation(dto.getLocation());
        lead.setLeadNotes(dto.getLeadNotes());
        lead.setEstimatedValue(dto.getEstimatedValue());
        lead.setFollowUpDate(dto.getFollow_up_date());

        // Set associated entities
        lead.setCounselor(fetchCounselor(dto.getCounselorId()));
        lead.setLeadSource(fetchLeadSource(dto.getLeadSourceId()));
        lead.setLeadStatus(fetchLeadStatus(dto.getLeadStatusId()));
        lead.setCourses(courseRepository.findAllById(dto.getCourseIds()));

        lead.setContactNo(dto.getContactNo());
        lead.setEmail(dto.getEmail());
        lead.setPriority(dto.getPriority());
        lead.setGender(dto.getGender());
        lead.setReferral(dto.getReferral());

        return lead;
    }

    private void updateLeadAssociations(Lead lead, LeadRequestDTO dto) {
        lead.setCounselor(fetchCounselor(dto.getCounselorId()));
        lead.setLeadSource(fetchLeadSource(dto.getLeadSourceId()));
        lead.setLeadStatus(fetchLeadStatus(dto.getLeadStatusId()));
        lead.setCourses(courseRepository.findAllById(dto.getCourseIds()));
    }

    private LeadSource fetchLeadSource(Long leadSourceId) {
        return leadSourceRepository.findById(leadSourceId)
                .orElseThrow(() -> new RuntimeException("Lead Source not found"));
    }

    private LeadStatus fetchLeadStatus(Long leadStatusId) {
        return leadStatusRepository.findById(leadStatusId)
                .orElseThrow(() -> new RuntimeException("Lead Status not found"));
    }

    private Counselor fetchCounselor(int counselorId) {
        return counselorRepository.findById(counselorId)
                .orElseThrow(() -> new RuntimeException("Counselor not found"));
    }

    private LeadResponseDTO convertToDto(Lead lead) {
        LeadResponseDTO dto = new LeadResponseDTO();
        dto.setId(lead.getId());
        dto.setLeadName(lead.getLeadName());
        dto.setLeadDate(lead.getLeadDate());
        dto.setLocation(lead.getLocation());
        dto.setLeadNotes(lead.getLeadNotes());
        dto.setEstimatedValue(lead.getEstimatedValue());
        dto.setCreatedDate(lead.getCreatedDate());
        dto.setUpdatedDate(lead.getUpdatedDate());
        dto.setFollow_up_date(lead.getFollowUpDate());

        // Map associated entities
        if (lead.getCounselor() != null) {
            dto.setCounselorUserName(lead.getCounselor().getCounselorUsername());
            dto.setCounselorId(lead.getCounselor().getId());
            
        }

        if (lead.getLeadSource() != null) {
            dto.setLeadSourceName(lead.getLeadSource().getSourceName());
            dto.setLeadSourceId(lead.getLeadSource().getId());
        }

        if (lead.getLeadStatus() != null) {
            dto.setLeadStatusName(lead.getLeadStatus().getStatusName());
            dto.setLeadStatusId(lead.getLeadStatus().getId());
        }

        if (lead.getCourses() != null) {
            dto.setCourseNames(
                lead.getCourses().stream()
                    .map(Courses::getCourseName)
                    .collect(Collectors.toList())
            );
            dto.setCourseIds(
                    lead.getCourses().stream()
                        .map(Courses::getId)  // Assuming Courses has a method getId() to get course ID
                        .collect(Collectors.toList())
                );
        }

        dto.setContactNo(lead.getContactNo());
        dto.setEmail(lead.getEmail());
        dto.setPriority(lead.getPriority());
        dto.setGender(lead.getGender());
        dto.setReferral(lead.getReferral());

        return dto;
    }

    @Override
    public LeadResponseDTO updateFollowupLead(Long id, LeadRequestDTO dto) {
        Lead existing = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));

        existing.setFollowUpDate(dto.getFollow_up_date());
        existing.setUpdatedDate(LocalDate.now());

        Lead updatedLead = leadRepository.save(existing);
        return convertToDto(updatedLead);
    }

    @Override
    public LeadResponseDTO NextupdateFollowupLead(Long id, LeadRequestDTO dto) {
        Lead existing = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found with id: " + id));

        existing.setLeadStatus(fetchLeadStatus(dto.getLeadStatusId()));
        existing.setFollowUpDate(dto.getFollow_up_date());
        existing.setUpdatedDate(LocalDate.now());

        Lead updatedLead = leadRepository.save(existing);
        return convertToDto(updatedLead);
    }
    
    
    
    
    @Override
    public List<LeadResponseDTO> getFilteredLeads(Integer leadStatusId, Integer counselorId, Integer leadSourceId, Integer courseId) {
        Specification<Lead> spec = Specification.where(null);

        if (leadStatusId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("leadStatus").get("id"), leadStatusId));
        }
        if (counselorId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("counselor").get("id"), counselorId));
        }
        if (leadSourceId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("leadSource").get("id"), leadSourceId));
        }
        if (courseId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.join("courses").get("id"), courseId));
        }

        List<Lead> leads = leadRepository.findAll(spec);

        return leads.stream()
                .map(this::convertToDto)  // Use the custom conversion logic
                .collect(Collectors.toList());
    }


    
    
}
