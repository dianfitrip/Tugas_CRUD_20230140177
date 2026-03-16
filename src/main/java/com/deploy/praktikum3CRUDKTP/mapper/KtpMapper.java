package com.deploy.praktikum3CRUDKTP.mapper;

import com.deploy.praktikum3CRUDKTP.model.dto.KtpDTO;
import com.deploy.praktikum3CRUDKTP.model.entity.Ktp;

public class KtpMapper {

    public static Ktp toEntity(KtpDTO dto) {

        Ktp ktp = new Ktp();

        ktp.setId(dto.getId());
        ktp.setNomorKtp(dto.getNomorKtp());
        ktp.setNamaLengkap(dto.getNamaLengkap());
        ktp.setAlamat(dto.getAlamat());
        ktp.setTanggalLahir(dto.getTanggalLahir());
        ktp.setJenisKelamin(dto.getJenisKelamin());

        return ktp;
    }

    public static KtpDTO toDTO(Ktp entity) {

        KtpDTO dto = new KtpDTO();

        dto.setId(entity.getId());
        dto.setNomorKtp(entity.getNomorKtp());
        dto.setNamaLengkap(entity.getNamaLengkap());
        dto.setAlamat(entity.getAlamat());
        dto.setTanggalLahir(entity.getTanggalLahir());
        dto.setJenisKelamin(entity.getJenisKelamin());

        return dto;
    }
}
