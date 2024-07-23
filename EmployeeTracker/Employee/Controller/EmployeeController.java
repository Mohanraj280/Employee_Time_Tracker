package com.example.EmployeeTracker.Employee.Controller;

import com.example.EmployeeTracker.Employee.Entity.Employee_Entity;
import com.example.EmployeeTracker.Employee.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee_Entity> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("Test endpoint is working", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Employee_Entity getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("{id}")
    public ResponseEntity<Employee_Entity> updateEmp(@PathVariable("id") Long empId, @RequestBody Employee_Entity updateEmp) {
        return ResponseEntity.ok(employeeService.updateEmp(empId, updateEmp));
    }

    @PostMapping
    public Employee_Entity saveEmployee(@RequestBody Employee_Entity employee) {
        return employeeService.saveEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
