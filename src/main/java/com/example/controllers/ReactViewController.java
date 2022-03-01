package com.example.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class ReactViewController {

    @GetMapping(path = "/home")
    public String index(Model model, Principal principal){
        model.addAttribute("user", principal.getName());
        return "messenger";
    }

    @GetMapping(path = "/")
    public String redirectToHome(){
        return "redirect:/home";
    }

}
