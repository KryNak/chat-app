package com.example.controllers;

import com.datastax.oss.driver.api.core.uuid.Uuids;
import com.example.dtos.MessageRequestDto;
import com.example.dtos.NewMessageNotificationDto;
import com.example.models.Message;
import com.example.models.UserUDT;
import com.example.repositories.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RequestMapping(path = "/api")
@RestController
public class MessageController {

    private final MessageRepository messagesRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(MessageRepository messagesRepository, SimpMessagingTemplate messagingTemplate) {
        this.messagesRepository = messagesRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping(path = "/participants/{participant}/messages")
    public ResponseEntity<List<Message>> getMessages(Principal principal, @PathVariable String participant){

        List<UserUDT> users = Arrays.asList(new UserUDT(principal.getName()), new UserUDT(participant));
        List<Message> messages = messagesRepository.findAllBySenderInAndReceiverInOrderByCreatedAt(users);

        return ResponseEntity.ok().body(messages);
    }

    @PostMapping(path = "/messages")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageRequestDto payload, Principal principal){
        String sender = principal.getName();

        Message message = Message.builder()
                .id(Uuids.timeBased())
                .message(payload.getMessage())
                .sender(new UserUDT(sender))
                .receiver(new UserUDT(payload.getReceiver()))
                .createdAt(LocalDateTime.now())
                .build();

        Message approvedMessage = messagesRepository.save(message);
        messagingTemplate.convertAndSendToUser(payload.getReceiver(),"/queue/message-callback", new NewMessageNotificationDto(approvedMessage));

        return ResponseEntity.ok(approvedMessage);
    }

}
