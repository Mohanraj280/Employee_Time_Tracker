package com.example.EmployeeTracker.Employee.Service;

import com.example.EmployeeTracker.Employee.Entity.Task_Entity;
import com.example.EmployeeTracker.Employee.Entity.User;
import com.example.EmployeeTracker.Employee.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findByRoleAndUsername(String role, String username) {
        return userRepository.findByRoleAndUsername(role, username);
    }

    public User saveTask(User user) {
        return userRepository.save(user);
    }
}
