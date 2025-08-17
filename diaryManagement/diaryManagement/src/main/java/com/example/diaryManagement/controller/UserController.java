package com.example.diaryManagement.controller;


import com.example.diaryManagement.exception.ResourceNotFound;
import com.example.diaryManagement.model.User;
import com.example.diaryManagement.repository.NoteRepository;
import com.example.diaryManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins="*") // to listen for the client side from every port
@RestController //that specifies http requests and responses
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    //SIGN UP API
    @PutMapping ("/user") //http://localhost:8090/api/user
    public User adduser(@RequestBody User user){
        String userEmailId =user.getEmail();
        User userDetails = userRepository.findByEmail(userEmailId);
        if(!ObjectUtils.isEmpty(userDetails)){
            throw new ResourceNotFound("mail already exists ");
        }
        return userRepository.save(user);
//        List<User> arr=userRepository.findAll();
//        int f=0;
//        for(int i=0;i<arr.size();i++) {
//            String mail = arr.get(i).getEmail();
//            if (mail.equals(s)) {
//                f = 1;
//                throw new ResourceNotFound("mail already exists " + s);
//            }
//        }
//        if(f==0){
//            userRepository.save(user);
//        }
//         userDetails;
    }


    //LOGIN API
    @PostMapping("/user")
    public String getUser(@RequestBody User user){
        List<User> l=userRepository.findAll();
        String given_mail=user.getEmail();
        String given_password=user.getPassword();
        int f=0;
        for(int i=0;i<l.size();i++){
            String mail=l.get(i).getEmail();
            String pass=l.get(i).getPassword();
            if(mail.equals(given_mail) && pass.equals(given_password)){
                f=1;
                break;
            }
        }
        if(f==1) {
            return given_mail;
        }
        return "";
    }
}

