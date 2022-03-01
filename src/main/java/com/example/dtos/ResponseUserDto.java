package com.example.dtos;

import com.example.models.User;
import lombok.Getter;

@Getter
public class ResponseUserDto {

    private final String username;

    public ResponseUserDto(User user){
        this.username = user.getUsername();
    }

}
