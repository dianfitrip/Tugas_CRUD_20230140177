package com.deploy.praktikum3CRUDKTP.service.impl;

import com.deploy.praktikum3CRUDKTP.dto.KtpDTO;
import com.deploy.praktikum3CRUDKTP.entity.Ktp;
import com.deploy.praktikum3CRUDKTP.mapper.KtpMapper;
import com.deploy.praktikum3CRUDKTP.repository.KtpRepository;
import com.deploy.praktikum3CRUDKTP.service.KtpService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KtpServiceImpl implements KtpService {

    private final KtpRepository repository;

    public KtpServiceImpl(KtpRepository repository) {
        this.repository = repository;
    }

    @Override
    public KtpDTO create(KtpDTO dto) {

        repository.findByNomorKtp(dto.getNomorKtp())
                .ifPresent(k -> {
                    throw new RuntimeException("Nomor KTP sudah ada");
                });

        Ktp entity = KtpMapper.toEntity(dto);
        repository.save(entity);

        return KtpMapper.toDTO(entity);
    }

    @Override
    public List<KtpDTO> findAll() {

        return repository.findAll()
                .stream()
                .map(KtpMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public KtpDTO findById(Integer id) {

        Ktp ktp = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data tidak ditemukan"));

        return KtpMapper.toDTO(ktp);
    }

    @Override
    public KtpDTO update(Integer id, KtpDTO dto) {

        Ktp ktp = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data tidak ditemukan"));

        ktp.setNomorKtp(dto.getNomorKtp());
        ktp.setNamaLengkap(dto.getNamaLengkap());
        ktp.setAlamat(dto.getAlamat());
        ktp.setTanggalLahir(dto.getTanggalLahir());
        ktp.setJenisKelamin(dto.getJenisKelamin());

        repository.save(ktp);

        return KtpMapper.toDTO(ktp);
    }

    @Override
    public void delete(Integer id) {

        repository.deleteById(id);
    }
}
