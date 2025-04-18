package com.mg.leadmanagmentsystem.controller;

import com.mg.leadmanagmentsystem.entity.LeadStatus;
import com.mg.leadmanagmentsystem.service.LeadStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lead-status")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadStatusController {

    @Autowired
    private LeadStatusService service;

    @GetMapping
    public List<LeadStatus> getAllStatuses() {
        return service.getAllStatuses();
    }

    @GetMapping("/{id}")
    public LeadStatus getStatusById(@PathVariable Long id) {
        return service.getStatusById(id);
    }

    @PostMapping
    public LeadStatus createStatus(@RequestBody LeadStatus leadStatus) {
        return service.createStatus(leadStatus);
    }

    @PutMapping("/{id}")
    public LeadStatus updateStatus(@PathVariable Long id, @RequestBody LeadStatus leadStatus) {
        return service.updateStatus(id, leadStatus);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable Long id) {
        service.deleteStatus(id);
    }
}
