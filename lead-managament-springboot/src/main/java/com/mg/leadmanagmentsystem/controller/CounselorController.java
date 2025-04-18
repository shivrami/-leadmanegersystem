package com.mg.leadmanagmentsystem.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mg.leadmanagmentsystem.entity.Counselor;
import com.mg.leadmanagmentsystem.repository.CounselorRepository;
import com.mg.leadmanagmentsystem.service.CounselorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/counselors")
public class CounselorController {

    @Autowired
    private CounselorService counselorService;

    @Autowired
    private CounselorRepository counselorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Counselor>> getAllCounselors() {
        return ResponseEntity.ok(counselorRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createCounselor(@RequestBody Counselor counselor) {
        if (counselorRepository.findByCounselorUsername(counselor.getCounselorUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Counselor already exists"));
        }

        counselor.setPassword(passwordEncoder.encode(counselor.getPassword()));
        Counselor savedCounselor = counselorRepository.save(counselor);
        return ResponseEntity.ok(savedCounselor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCounselor(@PathVariable Integer id, @RequestBody Counselor updateCounselor) {
        Optional<Counselor> optionalCounselor = counselorRepository.findById(id);
        if (!optionalCounselor.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Counselor existingCounselor = optionalCounselor.get();
        existingCounselor.setCounselorUsername(updateCounselor.getCounselorUsername());
        existingCounselor.setCounselorName(updateCounselor.getCounselorName());

        if (updateCounselor.getPassword() != null && !updateCounselor.getPassword().isEmpty()) {
            existingCounselor.setPassword(passwordEncoder.encode(updateCounselor.getPassword()));
        }

        counselorRepository.save(existingCounselor);
        return ResponseEntity.ok(existingCounselor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCounselor(@PathVariable Integer id) {
        if (!counselorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        counselorRepository.deleteById(id);
        return ResponseEntity.ok("Counselor deleted successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Counselor counselor) {
        Optional<Counselor> authenticatedCounselor = counselorService.authenticate(
                counselor.getCounselorUsername(), counselor.getPassword());
        if (authenticatedCounselor.isPresent()) {
            return ResponseEntity.ok(authenticatedCounselor.get());
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password"));
        }
    }
}
