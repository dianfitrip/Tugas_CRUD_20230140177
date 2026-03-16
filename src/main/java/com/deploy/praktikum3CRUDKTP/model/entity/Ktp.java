package com.deploy.praktikum3CRUDKTP.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "ktp")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ktp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nomor_ktp", unique = true)
    private String nomorKtp;

    @Column(name = "nama_lengkap")
    private String namaLengkap;

    private String alamat;

    @Column(name = "tanggal_lahir")
    private Date tanggalLahir;

    @Column(name = "jenis_kelamin")
    private String jenisKelamin;
}
