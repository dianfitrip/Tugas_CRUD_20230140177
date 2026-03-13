package com.deploy.praktikum3CRUDKTP.controller;

import com.deploy.praktikum3CRUDKTP.dto.KtpDTO;
import com.deploy.praktikum3CRUDKTP.service.KtpService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ktp")
@CrossOrigin
public class KtpController {

    private final KtpService service;

    public KtpController(KtpService service) {
        this.service = service;
    }

    @PostMapping
    public KtpDTO create(@RequestBody KtpDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<KtpDTO> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public KtpDTO getById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public KtpDTO update(@PathVariable Integer id, @RequestBody KtpDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
