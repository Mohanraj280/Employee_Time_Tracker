package com.example.EmployeeTracker.Employee.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task_Entity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "employee_id")
        private Employee_Entity employee;

        private LocalDate date;
        private LocalTime startTime;
        private LocalTime endTime;
        private String taskCategory;
        private String description;
        private String project;
        private String duration;
        private String status;

        public long getDuration() {
                if (startTime != null && endTime != null) {

                        if (endTime.isBefore(startTime)) {

                                Duration duration = Duration.between(startTime, LocalTime.MAX).plus(Duration.between(LocalTime.MIN, endTime));
                                return duration.toHours();
                        } else {

                                return Duration.between(startTime, endTime).toHours();
                        }
                } else {
                        return 0;
                }
        }
}
