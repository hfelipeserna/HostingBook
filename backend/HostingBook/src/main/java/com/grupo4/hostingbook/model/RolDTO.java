package com.grupo4.hostingbook.model;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

public class RolDTO implements Serializable {

    private Long id;
    private String nombre;
    private Set<UsuarioDTO> usuarios;

    public RolDTO() {
    }

    public RolDTO(Long id) {
        this.id = id;
    }

    public RolDTO(String nombre) {
        this.nombre = nombre;
    }

    public RolDTO(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public RolDTO(Long id, String nombre, Set<UsuarioDTO> usuarios) {
        this.id = id;
        this.nombre = nombre;
        this.usuarios = usuarios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<UsuarioDTO> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(Set<UsuarioDTO> usuarios) {
        this.usuarios = usuarios;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RolDTO rolDTO = (RolDTO) o;
        return id.equals(rolDTO.id) && nombre.equals(rolDTO.nombre) && usuarios.equals(rolDTO.usuarios);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, usuarios);
    }

    @Override
    public String toString() {
        return "RolDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", usuarios=" + usuarios +
                '}';
    }
}