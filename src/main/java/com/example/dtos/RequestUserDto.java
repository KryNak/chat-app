package com.example.dtos;

import com.example.validation.PasswordMatcher;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@PasswordMatcher
public class RequestUserDto {

    @NotBlank
    @Length(min = 6, max = 20)
    private String username;

    @NotBlank
    @Length(min = 8, max = 32)
    private String password;

    @NotBlank
    @Length(min = 8, max = 32)
    private String passwordRepetition;

}
