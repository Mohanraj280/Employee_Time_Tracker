package com.example.EmployeeTracker.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@EntityScan(basePackages = "com.example.EmployeeTracker.Employee.Entity")
@EnableJpaRepositories(basePackages = "com.example.EmployeeTracker.Employee.Repository")
public class EmployeeApplication {


	public static void main(String[] args) {
		SpringApplication.run(EmployeeApplication.class, args);
	}


}
