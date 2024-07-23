package com.example.EmployeeTracker.Employee.Exception;

public class ResourceNotFoundException extends  RuntimeException{
    public ResourceNotFoundException(String message)
    {
        super(message);
    }
}
