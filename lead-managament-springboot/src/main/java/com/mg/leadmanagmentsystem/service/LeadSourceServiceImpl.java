package com.mg.leadmanagmentsystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mg.leadmanagmentsystem.entity.LeadSource;
import com.mg.leadmanagmentsystem.repository.LeadSourceRepository;

@Service
public class LeadSourceServiceImpl implements LeadSourceService {

    @Autowired
    private LeadSourceRepository repository;

    @Override
    public List<LeadSource> getAllLeadSources() {
        return repository.findAll();
    }

    @Override
    public LeadSource getLeadSourceById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public LeadSource createLeadSource(LeadSource leadSource) {
        return repository.save(leadSource);
    }

    @Override
    public LeadSource updateLeadSource(Long id, LeadSource leadSource) {
        Optional<LeadSource> existingSource = repository.findById(id);
        if (existingSource.isPresent()) {
            LeadSource updatedSource = existingSource.get();
            updatedSource.setSourceName(leadSource.getSourceName());
            return repository.save(updatedSource);
        }
        return null;
    }

    @Override
    public void deleteLeadSource(Long id) {
        repository.deleteById(id);
    }
}
