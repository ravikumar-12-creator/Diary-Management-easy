package com.example.diaryManagement.Check;
import com.example.diaryManagement.model.User;
import com.example.diaryManagement.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;



public class CheckUser {

    @Autowired
    public UserRepository userRepository;

    @Setter
    @Getter
    private String mail;


    public List<String> AuthUser(String mail){
        List<User> l;
        l = userRepository.findAll();
        List<String> res=null;
        for(int i=0;i<l.size();i++){
            if(l.get(i).getEmail()==mail){
                res.add("True");
                res.add(mail);
                return res;
            }
        }
        res.add("False");
        res.add(" ");
        return res;
    }

    public CheckUser(){

    }
    public CheckUser(String mail){
        this.mail=mail;
    }
}

