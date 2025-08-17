package com.example.diaryManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "image")

public class Image {
    @Getter
    @Setter
    @Id
    private Long id;

    @Lob
    @Setter
    @Getter
    @Column(name = "image",length = 10000000)
    private byte[] image;



}
