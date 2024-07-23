package com.example.EmployeeTracker.Employee.Repository;


import com.example.EmployeeTracker.Employee.Entity.Employee_Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee_Entity, Long> {

}