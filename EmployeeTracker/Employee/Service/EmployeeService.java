package com.example.EmployeeTracker.Employee.Service;

import com.example.EmployeeTracker.Employee.Entity.Employee_Entity;
import com.example.EmployeeTracker.Employee.Exception.ResourceNotFoundException;
import com.example.EmployeeTracker.Employee.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    public List<Employee_Entity> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee_Entity getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee_Entity saveEmployee(Employee_Entity employee) {
        String password = generateRandomPassword(4);
        employee.setPassword(password);
        Employee_Entity savedEmployee = employeeRepository.save(employee);
        emailService.sendEmployeeDetailsEmail(savedEmployee);
        return savedEmployee;
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public Employee_Entity updateEmp(Long empId, Employee_Entity updateEmp) {
        Employee_Entity emp = employeeRepository.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Id is not found " + empId));

        emp.setFirstName(updateEmp.getFirstName());
        emp.setLastName(updateEmp.getLastName());
        emp.setEmail(updateEmp.getEmail());
        emp.setRole(updateEmp.getRole());
        return employeeRepository.save(emp);
    }

    private String generateRandomPassword(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(random.nextInt(10)); // 0-9
        }
        return sb.toString();
    }
}
