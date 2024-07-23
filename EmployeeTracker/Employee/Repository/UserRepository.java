package com.example.EmployeeTracker.Employee.Repository;

import com.example.EmployeeTracker.Employee.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByRoleAndUsername(String role, String username);
}