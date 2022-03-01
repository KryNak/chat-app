package com.example.controller;

import com.example.models.Message;
import com.example.models.User;
import com.example.models.UserUDT;
import com.example.repositories.MessageRepository;
import com.example.repositories.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles({"test"})
@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class MessengerApiTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @BeforeEach
    public void setup(){
        userRepository.save(new User("mich", ""));
        userRepository.save(new User("kris", ""));
        userRepository.save(new User("rom", ""));

        UserUDT kris = new UserUDT("kris");
        UserUDT rom = new UserUDT("rom");
        messageRepository.save(new Message(kris, rom, "Hej"));
        messageRepository.save(new Message(rom, kris, "No hej"));
        messageRepository.save(new Message(rom, kris, "Co tam?"));
        messageRepository.save(new Message(kris, rom, "Jest sprawa xD"));
        messageRepository.save(new Message(rom, kris, "xD"));
    }

    @Test
    @WithMockUser("kris")
    public void test_get_contacts() throws Exception {

        var actualResponse = mockMvc.perform(get("/api/contacts"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<User> actualUsers = new ObjectMapper().readValue(actualResponse, new TypeReference<>() {});

        var expected = Arrays.asList("mich", "rom");
        assertThat(actualUsers).extracting(User::getUsername).containsExactlyInAnyOrderElementsOf(expected);
    }

    @Test
    @WithMockUser("kris")
    public void test_get_messages() throws Exception {

        var actualResponse = mockMvc.perform(get("/api/participants/{participant}/messages", "rom"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<Message> actual = new ObjectMapper().readValue(actualResponse, new TypeReference<>() {});

        var expected = Arrays.asList("Hej", "No hej", "Co tam?", "Jest sprawa xD", "xD");
        assertThat(actual).extracting(Message::getMessage).containsExactlyElementsOf(expected);
    }

    @AfterEach
    void tearUp(){
        userRepository.deleteAll();
        messageRepository.deleteAll();
    }

}
