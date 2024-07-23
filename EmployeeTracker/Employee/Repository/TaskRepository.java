package com.example.EmployeeTracker.Employee.Repository;

import com.example.EmployeeTracker.Employee.Entity.Task_Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task_Entity, Long> {
      List<Task_Entity> findByEmployeeId(Long employeeId);
}