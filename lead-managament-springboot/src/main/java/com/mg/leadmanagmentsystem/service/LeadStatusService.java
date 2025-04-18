package com.mg.leadmanagmentsystem.service;

import com.mg.leadmanagmentsystem.entity.LeadStatus;
import java.util.List;

public interface LeadStatusService {
    List<LeadStatus> getAllStatuses();
    LeadStatus getStatusById(Long id);
    LeadStatus createStatus(LeadStatus leadStatus);
    LeadStatus updateStatus(Long id, LeadStatus leadStatus);
    void deleteStatus(Long id);
}
