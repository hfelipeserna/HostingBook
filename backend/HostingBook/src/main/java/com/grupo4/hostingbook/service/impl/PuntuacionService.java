package com.grupo4.hostingbook.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo4.hostingbook.exceptions.BadRequestException;
import com.grupo4.hostingbook.exceptions.Mensajes;
import com.grupo4.hostingbook.exceptions.NotImplementedException;
import com.grupo4.hostingbook.exceptions.ResourceNotFoundException;
import com.grupo4.hostingbook.model.ProductoDTO;
import com.grupo4.hostingbook.model.PuntuacionDTO;
import com.grupo4.hostingbook.persistence.entites.Puntuacion;
import com.grupo4.hostingbook.persistence.repository.IPuntuacionRepository;
import com.grupo4.hostingbook.service.IPuntuacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service("PuntuacionService")
public class PuntuacionService implements IPuntuacionService {

    private final IPuntuacionRepository puntuacionRepository;
    private final UsuarioService usuarioService;
    private final ProductoService productoService;
    private final ObjectMapper mapper;

    @Autowired
    public PuntuacionService(IPuntuacionRepository puntuacionRepository, UsuarioService usuarioService, @Lazy ProductoService productoService, ObjectMapper mapper) {
        this.puntuacionRepository = puntuacionRepository;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
        this.mapper = mapper;
    }

    @Override
    public PuntuacionDTO crear(PuntuacionDTO puntuacionDTO) throws BadRequestException, ResourceNotFoundException {
        validarCamposRequeridosCreacion(puntuacionDTO);
        guardarEntidadesAsociadas(puntuacionDTO);
        Puntuacion guardada = puntuacionRepository.save(mapper.convertValue(puntuacionDTO, Puntuacion.class));
        return setearEntidadesDeLaBaseDeDatos(guardada);
    }

    @Override
    public PuntuacionDTO buscarPorId(Long id) throws BadRequestException, ResourceNotFoundException {
        validarId(id);
        if (!puntuacionRepository.existsById(id)) {
            throw new ResourceNotFoundException(String.format(Mensajes.ERROR_NO_EXISTE, "La 'puntuación'", id));
        }
        return mapper.convertValue(puntuacionRepository.findById(id).get(), PuntuacionDTO.class);
    }

    @Override
    public List<PuntuacionDTO> consultarTodos() {
        List<Puntuacion> entidades = puntuacionRepository.findAll();
        List<PuntuacionDTO> dtos = new ArrayList<>();
        for (Puntuacion entidad : entidades) {
            dtos.add(mapper.convertValue(entidad, PuntuacionDTO.class));
        }
        return dtos;
    }

    @Override
    public PuntuacionDTO actualizar(PuntuacionDTO puntuacionDTO) throws BadRequestException, ResourceNotFoundException, NotImplementedException {
        throw new NotImplementedException("Funcionalidad actualizar puntuación no desarrollada");
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException, BadRequestException {
        validarId(id);
        puntuacionRepository.deleteById(id);
    }

    @Override
    public Set<PuntuacionDTO> consultarPorProductoID(Long id) {
        Set<PuntuacionDTO> dtos = new HashSet<>();
        for (Puntuacion p : puntuacionRepository.consultarPorProductoID(id)) {
            dtos.add(mapper.convertValue(p, PuntuacionDTO.class));
        }
        return dtos;
    }

    private void validarCamposRequeridosCreacion(PuntuacionDTO puntuacionDTO) throws BadRequestException {
        if (puntuacionDTO == null) {
            throw new BadRequestException(String.format(Mensajes.ERROR_DTO_NO_EXISTE, "Puntuación"));
        } else {
            if (puntuacionDTO.getPuntuacion() == null)
                throw new BadRequestException(String.format(Mensajes.ERROR_CREACION_CAMPO_REQUERIDO, "puntuación", "puntuación"));
            else if (puntuacionDTO.getPuntuacion() < 1 || puntuacionDTO.getPuntuacion() > 5)
                throw new BadRequestException(String.format(Mensajes.ERROR_CAMPO_FUERA_DE_RANGO, "La puntuación", "1", "5"));
            if (puntuacionDTO.getProducto() == null)
                throw new BadRequestException(String.format(Mensajes.ERROR_CREACION_CAMPO_REQUERIDO, "puntuación", "producto"));
            else if (puntuacionDTO.getProducto().getId() == null)
                throw new BadRequestException(String.format(Mensajes.ERROR_CREACION_CAMPO_REQUERIDO, "puntuación", "ID de producto"));
            if (puntuacionDTO.getUsuario() == null)
                throw new BadRequestException(String.format(Mensajes.ERROR_CREACION_CAMPO_REQUERIDO, "puntuación", "usuario"));
            else if (puntuacionDTO.getUsuario().getId() == null)
                throw new BadRequestException(String.format(Mensajes.ERROR_CREACION_CAMPO_REQUERIDO, "puntuación", "ID de usuario"));
        }
    }

    private void validarId(Long id) throws BadRequestException, ResourceNotFoundException {
        if (id < 1)
            throw new BadRequestException(Mensajes.ERROR_ID_FUERA_DE_RANGO);
        if (!puntuacionRepository.existsById(id))
            throw new ResourceNotFoundException(String.format(Mensajes.ERROR_NO_EXISTE, "La 'puntuación'", id));
    }

    private PuntuacionDTO setearEntidadesDeLaBaseDeDatos(Puntuacion puntuacion) throws BadRequestException, ResourceNotFoundException {
        PuntuacionDTO puntuacionDTO = new PuntuacionDTO();
        puntuacionDTO.setId(puntuacion.getId());
        puntuacionDTO.setPuntuacion(puntuacion.getPuntuacion());
        puntuacionDTO.setProducto(productoService.buscarPorId(puntuacion.getProducto().getId()));
        puntuacionDTO.setUsuario(usuarioService.buscarPorId(puntuacion.getUsuario().getId()));
        return puntuacionDTO;
    }

    private void guardarEntidadesAsociadas(PuntuacionDTO puntuacionDTO) throws BadRequestException, ResourceNotFoundException {
        ProductoDTO productoPorActualizar = productoService.buscarPorId(puntuacionDTO.getProducto().getId());
        Set<PuntuacionDTO> puntuaciones = productoPorActualizar.getPuntuaciones();
        puntuaciones.add(new PuntuacionDTO(puntuacionDTO.getId()));
        productoService.actualizar(productoPorActualizar);
    }
}