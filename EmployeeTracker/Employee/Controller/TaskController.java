package com.example.EmployeeTracker.Employee.Controller;


import com.example.EmployeeTracker.Employee.Entity.Task_Entity;
import com.example.EmployeeTracker.Employee.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/allTasks")
    public ResponseEntity<List<Task_Entity>> getAllTasks() {
        try {
            List<Task_Entity> tasks = taskService.getAllTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return new ResponseEntity<>("Test endpoint is working", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Task_Entity getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping
    public Task_Entity saveTask(@RequestBody Task_Entity task) {
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @PutMapping("/tasks/updateStatus/{id}")
    public ResponseEntity<Task_Entity> updateTaskStatus(@PathVariable Long id, @RequestBody Task_Entity request) {
        Task_Entity task = taskService.updateTaskStatus(id, request.getStatus());
        return ResponseEntity.ok(task);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Task_Entity> getTasksByEmployeeId(@PathVariable Long employeeId) {
        return taskService.getTasksByEmployeeId(employeeId);
    }
}
