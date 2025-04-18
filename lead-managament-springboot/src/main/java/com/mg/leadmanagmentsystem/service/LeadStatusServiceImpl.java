package com.mg.leadmanagmentsystem.service;

import com.mg.leadmanagmentsystem.entity.LeadStatus;
import com.mg.leadmanagmentsystem.repository.LeadStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LeadStatusServiceImpl implements LeadStatusService {

    @Autowired
    private LeadStatusRepository repository;

    @Override
    public List<LeadStatus> getAllStatuses() {
        return repository.findAll();
    }

    @Override
    public LeadStatus getStatusById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public LeadStatus createStatus(LeadStatus leadStatus) {
        return repository.save(leadStatus);
    }

    @Override
    public LeadStatus updateStatus(Long id, LeadStatus leadStatus) {
        Optional<LeadStatus> existingStatus = repository.findById(id);
        if (existingStatus.isPresent()) {
            LeadStatus updatedStatus = existingStatus.get();
            updatedStatus.setStatusName(leadStatus.getStatusName());
            return repository.save(updatedStatus);
        }
        return null;
    }

    @Override
    public void deleteStatus(Long id) {
        repository.deleteById(id);
    }
}
