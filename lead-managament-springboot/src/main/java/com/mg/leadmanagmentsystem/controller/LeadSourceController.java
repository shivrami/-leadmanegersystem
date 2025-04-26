package com.mg.leadmanagmentsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mg.leadmanagmentsystem.entity.LeadSource;
import com.mg.leadmanagmentsystem.service.LeadSourceService;

import java.util.List;

@RestController
@RequestMapping("/api/lead-source")
@CrossOrigin(origins = "http://localhost:3000") 
public class LeadSourceController {

    @Autowired
    private LeadSourceService leadSourceService;

 
    @GetMapping
    public ResponseEntity<List<LeadSource>> getAllLeadSources() {
        return ResponseEntity.ok(leadSourceService.getAllLeadSources());
    }

 
    @GetMapping("/{id}")
    public ResponseEntity<LeadSource> getLeadSourceById(@PathVariable Long id) {
        LeadSource leadSource = leadSourceService.getLeadSourceById(id);
        return (leadSource != null) ? ResponseEntity.ok(leadSource) : ResponseEntity.notFound().build();
    }

    // ✅ 3. Create a new lead source
    @PostMapping
    public ResponseEntity<LeadSource> createLeadSource(@RequestBody LeadSource leadSource) {
        LeadSource createdLeadSource = leadSourceService.createLeadSource(leadSource);
        return ResponseEntity.ok(createdLeadSource);
    }

    // ✅ 4. Update a lead source
    @PutMapping("/{id}")
    public ResponseEntity<LeadSource> updateLeadSource(@PathVariable Long id, @RequestBody LeadSource leadSource) {
        LeadSource updatedLeadSource = leadSourceService.updateLeadSource(id, leadSource);
        return (updatedLeadSource != null) ? ResponseEntity.ok(updatedLeadSource) : ResponseEntity.notFound().build();
    }

    // ✅ 5. Delete a lead source
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeadSource(@PathVariable Long id) {
        leadSourceService.deleteLeadSource(id);
        return ResponseEntity.noContent().build();
    }
}
