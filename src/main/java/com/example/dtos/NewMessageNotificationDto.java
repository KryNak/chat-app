package com.example.dtos;

import com.example.models.Message;
import com.example.models.UserUDT;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class NewMessageNotificationDto {

    private final NotificationType type;
    private final UUID id;
    private final UserUDT sender;
    private final UserUDT receiver;
    private final String message;
    private final LocalDateTime createdAt;

    public NewMessageNotificationDto(Message message){
        this.id = message.getId();
        this.sender = message.getSender();
        this.receiver = message.getReceiver();
        this.message = message.getMessage();
        this.createdAt = message.getCreatedAt();
        this.type = NotificationType.MESSAGE;
    }

}
