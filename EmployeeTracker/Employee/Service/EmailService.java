package com.example.EmployeeTracker.Employee.Service;

import com.example.EmployeeTracker.Employee.Entity.Employee_Entity;
import com.example.EmployeeTracker.Employee.Entity.Task_Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmployeeDetailsEmail(Employee_Entity employee) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(employee.getEmail());
        message.setSubject("Welcome to MR Technology!");
        message.setText("Dear " + employee.getFirstName() + ",\n\n" +
                "Welcome to the company! Here are your basic details:\n" +
                "Employee ID: " + employee.getId() + "\n" +
                "Password: " + employee.getPassword() + "\n" +
                "Role: " + employee.getRole() + "\n\n" +
                "Please keep this information secure.\n\n" +
                "Best regards,\n" +
                "CEO \n" + "Mohanraj S.\n");

        mailSender.send(message);
    }

    @Async
    public void sendTaskEmail(Task_Entity task) {
        if (task.getEmployee() != null && task.getEmployee().getEmail() != null) {
            String to = task.getEmployee().getEmail();
            String subject = "Task Details from MR Technology";
            String text = "Task Details:\n\n" +
                    "Task Category: " + task.getTaskCategory() + "\n" +
                    "Description: " + task.getDescription() + "\n" +
                    "Project: " + task.getProject() + "\n" +
                    "Date: " + task.getDate() + "\n" +
                    "Start Time: " + task.getStartTime() + "\n" +
                    "End Time: " + task.getEndTime() + "\n" +
                    "Duration: " + task.getDuration() + "\n" +
                    "Status: " + "In Progress" +
                    "\nBest regards \n" + "CEO \n" + "Mohanraj S.";

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);
        } else {
            System.out.println("Employee email is null. Cannot send email.");
        }
    }
}
