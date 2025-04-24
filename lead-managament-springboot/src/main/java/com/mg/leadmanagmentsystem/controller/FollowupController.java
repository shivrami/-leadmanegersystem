package com.mg.leadmanagmentsystem.controller;

import com.mg.dto.FollowupRequestDTO;
import com.mg.dto.FollowupResponseDTO;
import com.mg.dto.LeadRequestDTO;
import com.mg.dto.LeadResponseDTO;
import com.mg.leadmanagmentsystem.service.FollowupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/followups")
@CrossOrigin(origins = "http://localhost:3000")
public class FollowupController {

    @Autowired
    private FollowupService followupService;

    
    @PostMapping("/lead/{leadId}")
    public ResponseEntity<FollowupResponseDTO> createFollowup(
            @PathVariable Long leadId, @RequestBody FollowupRequestDTO followupRequestDTO) {
        FollowupResponseDTO createdFollowup = followupService.createFollowup(leadId, followupRequestDTO);
        return ResponseEntity.ok(createdFollowup);
    }

   
    @GetMapping("/lead/{leadId}")
    public ResponseEntity<List<FollowupResponseDTO>> getFollowupsByLeadId(@PathVariable Long leadId) {
        List<FollowupResponseDTO> followups = followupService.getFollowupsByLeadId(leadId);
        return ResponseEntity.ok(followups);
    }
    
    @PutMapping("/leads/{leadId}/followup")
    public ResponseEntity<FollowupResponseDTO> updateNextFollowup(
            @PathVariable Long leadId,
            @RequestBody FollowupRequestDTO requestDTO
    ) {
        FollowupResponseDTO responseDTO = followupService.updateNextFollowupLead(leadId, requestDTO);
        return ResponseEntity.ok(responseDTO);
    }
}
