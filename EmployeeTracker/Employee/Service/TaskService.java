package com.example.EmployeeTracker.Employee.Service;

import com.example.EmployeeTracker.Employee.Entity.Employee_Entity;
import com.example.EmployeeTracker.Employee.Entity.Task_Entity;
import com.example.EmployeeTracker.Employee.Exception.ResourceNotFoundException;
import com.example.EmployeeTracker.Employee.Repository.EmployeeRepository;
import com.example.EmployeeTracker.Employee.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    public List<Task_Entity> getAllTasks() {
        try {
            return taskRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public Task_Entity getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public Task_Entity saveTask(Task_Entity task) {
        Long employeeId = task.getEmployee().getId();
        Employee_Entity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        task.setEmployee(employee);

        Task_Entity savedTask = taskRepository.save(task);
        emailService.sendTaskEmail(savedTask);
        return savedTask;
    }

    public Task_Entity updateTaskStatus(Long id, String status) {
        Task_Entity task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<Task_Entity> getTasksByEmployeeId(Long employeeId) {
        return taskRepository.findByEmployeeId(employeeId);
    }


    }

