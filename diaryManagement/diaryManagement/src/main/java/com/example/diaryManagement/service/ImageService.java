package com.example.diaryManagement.service;

import com.example.diaryManagement.model.Image;
import com.example.diaryManagement.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;


@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;


    public String saveImge(MultipartFile file, Long id) throws IOException {
        Image image = new Image();
        image.setImage(file.getBytes());
        image.setId(id);
        imageRepository.save(image);
        return "Sucessfully added";
    }

    public String getImg(Long id) {

        int f=0;
        List<Image> images = imageRepository.findAll();
        for(int i=0;i<images.size();i++) {
            System.out.println(images.get(i).getId());
            if (id.equals(images.get(i).getId())) {
                System.out.println("hi");
                f = 1;
                String base64Image = Base64.getEncoder().encodeToString(images.get(i).getImage()); ///converts binary data to string
                return base64Image;
            }
        }
        return "";
    }

    public String deleimg(Long id){
        imageRepository.deleteById(id);
        return "sucessfully deleted";
    }

    }
