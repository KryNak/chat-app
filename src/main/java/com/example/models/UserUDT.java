package com.example.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

@Data
@UserDefinedType("user")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserUDT {

    private String username;

}
