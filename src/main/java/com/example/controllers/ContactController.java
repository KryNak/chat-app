package com.example.controllers;

import com.example.dtos.ResponseUserDto;
import com.example.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RequestMapping(path = "/api/contacts")
@RestController
public class ContactController {

    private final UserRepository userRepository;

    public ContactController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    public ResponseEntity<List<ResponseUserDto>> getContacts(Principal principal){
        List<ResponseUserDto> users = userRepository.findAll()
                .stream()
                .filter(e -> !e.getUsername().equals(principal.getName()))
                .map(ResponseUserDto::new)
                .toList();

        return ResponseEntity.ok(users);
    }

}
