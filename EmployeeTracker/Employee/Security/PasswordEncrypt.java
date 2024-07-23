//package com.example.EmployeeTracker.Employee.Security;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//public class PasswordEncrypt {
//
//        private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//        public static String hashPassword(String password) {
//            return passwordEncoder.encode(password);
//        }
//
//        public static boolean checkPassword(String rawPassword, String encodedPassword) {
//            return passwordEncoder.matches(rawPassword, encodedPassword);
//        }
//    }
//
