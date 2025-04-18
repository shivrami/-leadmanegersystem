package com.mg.leadmanagmentsystem.service;

import java.util.List;
import com.mg.leadmanagmentsystem.entity.LeadSource;

public interface LeadSourceService {
    List<LeadSource> getAllLeadSources();
    LeadSource getLeadSourceById(Long id);
    LeadSource createLeadSource(LeadSource leadSource);
    LeadSource updateLeadSource(Long id, LeadSource leadSource);
    void deleteLeadSource(Long id);
}
