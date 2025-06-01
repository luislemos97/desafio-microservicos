package com.example.consumo.produto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.consumo.produto.dto.ProductDTO;
import com.example.consumo.produto.service.InventoryService;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<String>> checkStock(@PathVariable Long id) {
        return inventoryService.getProductById(id).thenApply(product -> {
            if (product.getQuantidade() < 10) {
                return ResponseEntity.ok("Produto: " + product.getNome() +
                        " | Quantidade em estoque baixa: " + product.getQuantidade());
            } else {
                return ResponseEntity.ok("Produto: " + product.getNome() +
                        " | Quantidade em estoque suficiente: " + product.getQuantidade());
            }
        });
    }
}