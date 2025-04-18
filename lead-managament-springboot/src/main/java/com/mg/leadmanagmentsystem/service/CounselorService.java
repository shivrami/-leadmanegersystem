package com.mg.leadmanagmentsystem.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mg.leadmanagmentsystem.entity.Counselor;
import com.mg.leadmanagmentsystem.repository.CounselorRepository;

@Service
public class CounselorService {

    @Autowired
    private CounselorRepository counselorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<Counselor> authenticate(String username, String password) {
        Optional<Counselor> counselorOpt = counselorRepository.findByCounselorUsername(username);

        if (counselorOpt.isPresent()) {
            Counselor counselor = counselorOpt.get();
            if (passwordEncoder.matches(password, counselor.getPassword())) {
                return Optional.of(counselor);
            }
        }

        return Optional.empty();
    }
}
