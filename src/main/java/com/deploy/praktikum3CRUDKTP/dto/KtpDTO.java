package com.deploy.praktikum3CRUDKTP.dto;

import lombok.Data;
import java.util.Date;

@Data
public class KtpDTO {

    private Integer id;
    private String nomorKtp;
    private String namaLengkap;
    private String alamat;
    private Date tanggalLahir;
    private String jenisKelamin;

}
