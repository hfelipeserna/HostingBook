package com.grupo4.hostingbook.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class ProductoDTO implements Serializable {

    private Long id;
    private String nombre;
    private String descripcion;
    private CategoriaDTO categoria;
    private CiudadDTO ciudad;
    private Set<ImagenDTO> imagenes;
    private Set<CaracteristicaDTO> caracteristicas;

    public ProductoDTO(){}

    public ProductoDTO(String nombre,
                       String descripcion,
                       CategoriaDTO categoria,
                       CiudadDTO ciudad,
                       Set<ImagenDTO> imagenes,
                       Set<CaracteristicaDTO> caracteristicas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ciudad = ciudad;
        this.imagenes = imagenes;
        this.caracteristicas = caracteristicas;
    }

    public ProductoDTO(Long id,
                       String nombre,
                       String descripcion,
                       CategoriaDTO categoria,
                       CiudadDTO ciudad,
                       Set<ImagenDTO> imagenes,
                       Set<CaracteristicaDTO> caracteristicas) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ciudad = ciudad;
        this.imagenes = imagenes;
        this.caracteristicas = caracteristicas;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public CategoriaDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaDTO categoria) {
        this.categoria = categoria;
    }

    public CiudadDTO getCiudad() {
        return ciudad;
    }

    public void setCiudad(CiudadDTO ciudad) {
        this.ciudad = ciudad;
    }

    public Set<ImagenDTO> getImagenes() {
        return imagenes;
    }

    public void setImagenes(Set<ImagenDTO> imagenes) {
        this.imagenes = imagenes;
    }

    public Set<CaracteristicaDTO> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Set<CaracteristicaDTO> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductoDTO that = (ProductoDTO) o;
        return Objects.equals(id, that.id) && Objects.equals(nombre, that.nombre) && Objects.equals(descripcion, that.descripcion) && Objects.equals(categoria, that.categoria) && Objects.equals(ciudad, that.ciudad) && (imagenes.containsAll(that.imagenes) && that.imagenes.containsAll(imagenes)) && (caracteristicas.containsAll(that.caracteristicas) && that.caracteristicas.containsAll(caracteristicas));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, descripcion, categoria, ciudad, imagenes, caracteristicas);
    }

    @Override
    public String toString() {
        Set<ImagenDTO> imagenesToString = new HashSet<>();
        for (ImagenDTO i: imagenes) {
            i.toString();
            imagenesToString.add(i);
        }

        Set<CaracteristicaDTO> caracteristicasToString = new HashSet<>();
        for (CaracteristicaDTO c: caracteristicas) {
            c.toString();
            caracteristicasToString.add(c);
        }

        return "ProductoDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", categoria=" + categoria.toString() +
                ", ciudad=" + ciudad.toString() +
                ", imagenes=" + imagenesToString +
                ", caracteristicas=" + caracteristicasToString +
                '}';
    }
}