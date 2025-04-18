package com.mg.leadmanagmentsystem.controller;

import com.mg.leadmanagmentsystem.entity.Admin;
import com.mg.leadmanagmentsystem.repository.AdminRepository;
import com.mg.leadmanagmentsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

 
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
        	return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));


        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // PUT update admin
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Integer id, @RequestBody Admin updatedAdmin) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (!optionalAdmin.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Admin existingAdmin = optionalAdmin.get();
        existingAdmin.setUsername(updatedAdmin.getUsername());

        if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
            existingAdmin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
        }

        adminRepository.save(existingAdmin);
        return ResponseEntity.ok(existingAdmin);
    }

    // DELETE admin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Integer id) {
        if (!adminRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        adminRepository.deleteById(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }

    // POST login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        Optional<Admin> authenticatedAdmin = adminService.authenticate(admin.getUsername(), admin.getPassword());
        if (authenticatedAdmin.isPresent()) {
            return ResponseEntity.ok(authenticatedAdmin.get());
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
