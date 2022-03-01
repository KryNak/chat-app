package com.example.controllers;

import com.example.dtos.NewUserNotificationDto;
import com.example.dtos.RequestUserDto;
import com.example.models.User;
import com.example.repositories.UserRepository;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api")
@Validated
public class RegisterController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SimpMessagingTemplate messagingTemplate;

    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder, SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<String> register(@Valid @RequestBody RequestUserDto requestUserDto){
        User user = new User();
        user.setUsername(requestUserDto.getUsername());
        user.setPassword(passwordEncoder.encode(requestUserDto.getPassword()));

        if(userRepository.findUserByUsername(user.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username is in use.");
        }

        User save = userRepository.save(user);

        messagingTemplate.convertAndSend("/topic/new-user", new NewUserNotificationDto(save.getUsername()));
        return ResponseEntity.ok(save.getUsername());
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<List<String>> error(MethodArgumentNotValidException ex){

        List<String> errors = ex.getBindingResult().getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        return ResponseEntity.status(400).body(errors);
    }

}
