package com.example.validation;

import com.example.dtos.RequestUserDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatcherValidator implements ConstraintValidator<PasswordMatcher, RequestUserDto> {

    @Override
    public boolean isValid(RequestUserDto requestUserDto, ConstraintValidatorContext constraintValidatorContext) {
        if(requestUserDto.getPassword() == null || requestUserDto.getPasswordRepetition() == null){
            return false;
        }

        return requestUserDto.getPassword().equals(requestUserDto.getPasswordRepetition());
    }

}
