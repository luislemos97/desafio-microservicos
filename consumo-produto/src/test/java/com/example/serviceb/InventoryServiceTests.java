package com.example.serviceb;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;

import com.example.consumo.produto.dto.ProductDTO;
import com.example.consumo.produto.service.InventoryService;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class InventoryServiceTests {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private InventoryService inventoryService;

    public InventoryServiceTests() {
        MockitoAnnotations.openMocks(this);
        inventoryService = new InventoryService("http://localhost:8081");
        inventoryService = spy(inventoryService);
    }

    @Test
    public void testFallback() throws Exception {
        CompletableFuture<ProductDTO> future = inventoryService.fallbackProduct(1L, new RuntimeException());
        ProductDTO product = future.get();
        assertEquals("Unknown", product.getNome());
        assertEquals(0, product.getQuantidade());
    }
}