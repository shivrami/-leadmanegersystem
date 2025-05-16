package com.mg.leadmanagmentsystem.controller;

import com.mg.dto.LeadRequestDTO;
import com.mg.dto.LeadResponseDTO;
import com.mg.leadmanagmentsystem.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<LeadResponseDTO> createLead(@RequestBody LeadRequestDTO leadRequestDTO) {
        LeadResponseDTO createdLead = leadService.createLead(leadRequestDTO);
        return ResponseEntity.ok(createdLead);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponseDTO> updateLead(@PathVariable Long id, @RequestBody LeadRequestDTO leadRequestDTO) {
        LeadResponseDTO updatedLead = leadService.updateLead(id, leadRequestDTO);
        return ResponseEntity.ok(updatedLead);
    }

    @PutMapping("/{id}/followup")
    public ResponseEntity<LeadResponseDTO> updateFollowupLead(@PathVariable Long id, @RequestBody LeadRequestDTO leadRequestDTO) {
        LeadResponseDTO updatedLead = leadService.updateFollowupLead(id, leadRequestDTO);
        return ResponseEntity.ok(updatedLead);
    }

    @PutMapping("/{id}/nextfollowup")
    public ResponseEntity<LeadResponseDTO> NextupdateFollowupLead(@PathVariable Long id, @RequestBody LeadRequestDTO leadRequestDTO) {
        LeadResponseDTO updatedLead = leadService.NextupdateFollowupLead(id, leadRequestDTO);
        return ResponseEntity.ok(updatedLead);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponseDTO> getLeadById(@PathVariable Long id) {
        LeadResponseDTO lead = leadService.getLeadById(id);
        return ResponseEntity.ok(lead);
    }

    // Refactored Get Mapping to handle both unfiltered and filtered leads
    @GetMapping
    public ResponseEntity<List<LeadResponseDTO>> getAllLeads(
            @RequestParam(required = false) Integer leadStatusId,
            @RequestParam(required = false) Integer counselorId,
            @RequestParam(required = false) Integer leadSourceId,
            @RequestParam(required = false) Integer courseId) {

        List<LeadResponseDTO> leads;
        
        if (leadStatusId == null && counselorId == null && leadSourceId == null && courseId == null) {
            // If no parameters are passed, fetch all leads
            leads = leadService.getAllLeads();
        } else {
            // If parameters are passed, fetch filtered leads
            leads = leadService.getFilteredLeads(leadStatusId, counselorId, leadSourceId, courseId);
        }
        
        return ResponseEntity.ok(leads);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }
}
