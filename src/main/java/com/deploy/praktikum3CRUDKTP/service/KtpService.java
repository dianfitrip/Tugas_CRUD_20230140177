package com.deploy.praktikum3CRUDKTP.service;

import com.deploy.praktikum3CRUDKTP.dto.KtpDTO;
import java.util.List;

public interface KtpService {

    KtpDTO create(KtpDTO dto);

    List<KtpDTO> findAll();

    KtpDTO findById(Integer id);

    KtpDTO update(Integer id, KtpDTO dto);

    void delete(Integer id);

}
