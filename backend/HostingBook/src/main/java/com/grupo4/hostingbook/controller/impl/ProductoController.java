package com.grupo4.hostingbook.controller.impl;

import com.grupo4.hostingbook.controller.IProductoController;
import com.grupo4.hostingbook.exceptions.BadRequestException;
import com.grupo4.hostingbook.exceptions.Mensajes;
import com.grupo4.hostingbook.exceptions.ResourceNotFoundException;
import com.grupo4.hostingbook.model.ProductoDTO;
import com.grupo4.hostingbook.service.IProductoService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST })
public class ProductoController implements IProductoController {

    private final IProductoService productoService;

    @Autowired
    public ProductoController(IProductoService productoService) {
        this.productoService = productoService;
    }

    @Override
    @ApiOperation(value = "Lista todos los productos")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success")
    })
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodos() throws BadRequestException, ResourceNotFoundException {
        List<ProductoDTO> productos = productoService.consultarTodos();
        return ResponseEntity.ok(productos);
    }

    @Override
    @ApiOperation(value = "Crea un nuevo producto")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody ProductoDTO producto) throws BadRequestException {
        ProductoDTO productoNuevo = productoService.crear(producto);
        return ResponseEntity.ok(productoNuevo);
    }

    @Override
    @ApiOperation(value = "Busca un producto por ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> buscarPorId(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        ProductoDTO producto = productoService.buscarPorId(id);
        return ResponseEntity.ok(producto);
    }

    @Override
    @ApiOperation(value = "Actualiza un producto")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    @PutMapping
    public ResponseEntity<ProductoDTO> actualizar(@RequestBody ProductoDTO producto) throws BadRequestException, ResourceNotFoundException {
        ProductoDTO productoActualizado = productoService.actualizar(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    @Override
    @ApiOperation(value = "Elimina un producto")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 400, message = "Bad Request")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        productoService.eliminar(id);
        return ResponseEntity.ok(String.format(Mensajes.ELIMINADO_CON_EXITO,"Producto", id));
    }

    @Override
    @ApiOperation(value = "Lista todos los productos según la categoria especificada")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success")
    })
    @GetMapping("/categoria")
    public ResponseEntity<?> obtenerPorCategoria(@RequestParam String title) throws BadRequestException, ResourceNotFoundException {
        Set<ProductoDTO> productos = productoService.consultarPorCategoria(title);
        return ResponseEntity.ok(productos);
    }


    @Override
    @ApiOperation(value = "Lista todos los productos según la ciudad especificada")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Success")
    })
    @GetMapping("/ciudad")
    public ResponseEntity<?> obtenerPorCiudad(@RequestParam String name) throws BadRequestException, ResourceNotFoundException {
        Set<ProductoDTO> productos = productoService.consultarPorCiudad(name);
        return ResponseEntity.ok(productos);
    }
}
