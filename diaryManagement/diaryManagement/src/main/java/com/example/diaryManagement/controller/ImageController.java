package com.example.diaryManagement.controller;


import com.example.diaryManagement.model.Image;
import com.example.diaryManagement.repository.ImageRepository;
import com.example.diaryManagement.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/save")
    public String saveImage(@RequestParam("file") MultipartFile file,@RequestHeader Long id) throws IOException {
        System.out.println("Called");
        System.out.println(id);
        return imageService.saveImge(file,id);
    }

    @GetMapping("/save/{id}")
    public String deleimg(@PathVariable Long id){
        return imageService.deleimg(id);

    }

}


