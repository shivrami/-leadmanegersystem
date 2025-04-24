package com.mg.leadmanagmentsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mg.leadmanagmentsystem.entity.Counselor;

public interface CounselorRepository extends JpaRepository<Counselor, Integer> {
    Optional<Counselor> findByCounselorUsername(String counselorUsername);

	Optional<Counselor> findById(int counselorId);
}
