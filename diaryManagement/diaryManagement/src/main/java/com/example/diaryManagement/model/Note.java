package com.example.diaryManagement.model;



import jakarta.persistence.*;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;


@Entity
@Table(name="demo")
public class Note {
    @Getter
    @Setter
    @Id //primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  //column 1 field date,description

    @Column(name="title",length = 10000)
    @Getter
    @Setter
    private String title;

    @Column(name="content")
    @Getter
    @Setter
    private String content;

    @Setter
    @Getter
    @Column(name = "user_id")
    private String user_id;

    @Lob
    @Setter
    @Getter
    @Column(name = "image",length = 10000000)
    private String image;

    public Note() {

    }
    public Note(String title,String content,String user_id){
        super();
        this.title=title;
        this.content=content;
        this.user_id=user_id;
    }
}
