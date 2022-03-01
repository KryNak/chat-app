package com.example.dtos;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class NewUserNotificationDto {

    private final NotificationType type = NotificationType.USER;
    private final String username;

}
