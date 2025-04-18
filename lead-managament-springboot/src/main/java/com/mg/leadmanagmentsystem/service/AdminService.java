package com.mg.leadmanagmentsystem.service;

import com.mg.leadmanagmentsystem.entity.Admin;
import com.mg.leadmanagmentsystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> authenticate(String username, String password) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            if (admin.getPassword().equals(password)) {
                return Optional.of(admin);
            }
        }
        return Optional.empty();
    }
}
