package com.example.diaryManagement.controller;

import com.example.diaryManagement.Check.CheckUser;
import com.example.diaryManagement.exception.ResourceNotFound;
import com.example.diaryManagement.model.Note;
import com.example.diaryManagement.model.User;
import com.example.diaryManagement.repository.NoteRepository;
import com.example.diaryManagement.repository.UserRepository;
import com.example.diaryManagement.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.*;

//apis generation and database operations.
//signup ---> user cerenditials database store



//annotations
@CrossOrigin(origins="*") // to listen for the client side from every port
@RestController //that specifies http requests and responses
@RequestMapping("/api")
public class NoteController {
    @Autowired // to include the repository created which provides the database management methods
    private NoteRepository noteRepository; //object to use all the functions  stored in JPARepository

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;


    @GetMapping("/notes") //GET http:localhost:8090/api/notes
    public List<Note> getAllNote(@RequestHeader String user_mail){
        List<Note> l= noteRepository.findAll(); //list return database data
        //[{id,title,content} , {} , {} , {} ]
        List<User> users = userRepository.findAll();
        int f=0;
        for(int i=0;i<users.size();i++){
            if(users.get(i).getEmail().equals(user_mail)){
                f=1;
                break;
            }
        }
        List<Note> arr =  new ArrayList<>();
        if(f==1){
            for(int i=0;i<l.size();i++){
                if(l.get(i).getUser_id().equals(user_mail)){
                    Note j=l.get(i);
                    System.out.println(j.getId());
                    String s=imageService.getImg(j.getId());
                    System.out.println(s);
                    j.setImage(s);
                    arr.add(j);
                }
            }
            return arr;
        }
        return null;

    }

    //add entry D O N E
    @PostMapping("/notes") //post to add entry to the database post method----> user data
    public Note addNotes(@RequestBody Note note, @RequestHeader String user_mail) throws IOException {
        List<User> users = userRepository.findAll();
        int f=0;
        for(int i=0;i<users.size();i++){
            if(users.get(i).getEmail().equals(user_mail)){
                f=1;
                break;
            }
        }
        if(f==1){
            note.setUser_id(user_mail);
            return noteRepository.save(note);
        }
        return null;

    }


    //Delete HTTP METHOD
    @DeleteMapping("/notes/{id}") //http://localhost:8090/api/notes/11
    public ResponseEntity<Map<String,Boolean>> deletenote(@PathVariable Long id) {
        Note note = noteRepository.findById(id) //database {title:miles,content:morales}
                .orElseThrow(() -> new ResourceNotFound("notes not exist with id=" + id));

        noteRepository.delete(note);
        Map<String, Boolean> response=new HashMap<>();
        response.put("deleted=", Boolean.TRUE);
        return ResponseEntity.ok(response);
        //response={"deleted":"True",........}
    }


    //update method
    @PostMapping("/notes/{id}") //update API
    public List<Note> updateNote(@PathVariable Long id,@RequestBody Map<String,String> m1){
            Note note = noteRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFound("no entry with the id given"+id));
            for (String s:m1.keySet()){ // it returns a set ["title","content"]
                if(s == "title" && !m1.get(s).isEmpty()){
                    note.setTitle(m1.get(s));
                    String st=imageService.getImg(id);
                    note.setImage(st);
                    noteRepository.save(note);
                }
                if(s == "content" && !m1.get(s).isEmpty()){
                    note.setContent(m1.get(s));
                    String st=imageService.getImg(id);
                    note.setImage(st);
                    noteRepository.save(note);
                }
            }
            return noteRepository.findAll();
    }

}
