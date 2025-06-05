package com.example.consumo.produto.controller;

import com.example.consumo.produto.dto.InventoryDTO;
import com.example.consumo.produto.service.InventoryServiceValidation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
    
    private final InventoryServiceValidation inventoryServiceValidation;

    public InventoryController(InventoryServiceValidation inventoryServiceValidation) {
        this.inventoryServiceValidation = inventoryServiceValidation;
    }

    @GetMapping("/{id}")
    public CompletableFuture<ResponseEntity<InventoryDTO>> checkStock(@PathVariable Long id) {
        return inventoryServiceValidation
                .checkStockStatus(id)
                .thenApply(ResponseEntity::ok);
    }
}
