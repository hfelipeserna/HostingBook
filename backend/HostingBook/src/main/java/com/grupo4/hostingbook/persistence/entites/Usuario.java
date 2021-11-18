package com.grupo4.hostingbook.persistence.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="usuario_id")
    private Long id;
    private String nombre;
    private String apellido;
    private String mail;
    private String contrasenia;
    @Column(name="cuenta_validada")
    private Boolean cuentaValidada;

    @OneToMany(mappedBy = "puntuacion")
    @JsonIgnore
    private Set<Puntuacion> puntuaciones = new HashSet<>();

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.DETACH,
            CascadeType.REFRESH,
            CascadeType.REMOVE
    })
    @JoinTable(
            name = "usuario_producto",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "producto_id")
    )
    private Set<Producto> productosFavoritos = new HashSet<>();

    public Usuario() {}

    public Usuario(Long id) {
        this.id = id;
    }

    public Usuario(Long id, String nombre, String apellido, String mail, String contrasenia) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contrasenia = contrasenia;
    }

    public Usuario(String nombre,
                   String apellido,
                   String mail,
                   String contrasenia,
                   Set<Producto> productosFavoritos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contrasenia = contrasenia;
        this.productosFavoritos = productosFavoritos;
    }

    public Usuario(Long id,
                   String nombre,
                   String apellido,
                   String mail,
                   String contrasenia,
                   Set<Producto> productosFavoritos) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.contrasenia = contrasenia;
        this.productosFavoritos = productosFavoritos;
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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public Set<Producto> getProductosFavoritos() {
        return productosFavoritos;
    }

    public void setProductosFavoritos(Set<Producto> productosFavoritos) {
        this.productosFavoritos = productosFavoritos;
    }

    public Boolean getCuentaValidada() {
        return cuentaValidada;
    }

    public void setCuentaValidada(Boolean cuentaValidada) {
        this.cuentaValidada = cuentaValidada;
    }

    public Set<Puntuacion> getPuntuaciones() {
        return puntuaciones;
    }

    public void setPuntuaciones(Set<Puntuacion> puntuaciones) {
        this.puntuaciones = puntuaciones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Usuario)) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(nombre, usuario.nombre) && Objects.equals(apellido, usuario.apellido) && Objects.equals(mail, usuario.mail) && Objects.equals(contrasenia, usuario.contrasenia) && Objects.equals(cuentaValidada, usuario.cuentaValidada) && Objects.equals(puntuaciones, usuario.puntuaciones) && Objects.equals(productosFavoritos, usuario.productosFavoritos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, apellido, mail, contrasenia, cuentaValidada, puntuaciones, productosFavoritos);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getPassword() {
        return this.contrasenia;
    }

    @Override
    public String getUsername() {
        return this.mail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
