package com.example.serviceb;

import com.example.consumo.produto.dto.InventoryDTO;
import com.example.consumo.produto.dto.ProductDTO;
import com.example.consumo.produto.service.InventoryServiceValidation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InventoryServiceTests {

    @Mock
    private RestTemplate restTemplate;

    private InventoryServiceValidation inventoryServiceValidation;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        inventoryServiceValidation = new InventoryServiceValidation("http://fake-url:8081", restTemplate);
    }

    @Test
    void whenQuantityBelowLimit_thenInventoryDTOHasEstoqueBaixoTrue() throws Exception {
        Long id = 1L;
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(id);
        productDTO.setNome("Produto X");
        productDTO.setQuantidade(5);

        // Configura o comportamento do mock para retornar o productDTO
        when(restTemplate.getForEntity("http://fake-url:8081/api/products/1", ProductDTO.class))
                .thenReturn(ResponseEntity.ok(productDTO));

        // Executa o método a ser testado
        CompletableFuture<InventoryDTO> future = inventoryServiceValidation.checkStockStatus(id);
        InventoryDTO status = future.get();

        // Verificações de conteúdo do DTO
        assertTrue(status.isEstoqueBaixo());
        assertEquals("Produto X", status.getNome());
        assertEquals(5, status.getQuantidade());
        assertTrue(status.getMensagem().contains("Quantidade em estoque baixa"));

        // ==== Verify aqui ====
        // Assegura que getForEntity foi chamado exatamente uma vez com os parâmetros corretos
        verify(restTemplate, times(1))
                .getForEntity("http://fake-url:8081/api/products/1", ProductDTO.class);

        // (Opcional) Verifica que não houve nenhuma outra interação além desse getForEntity
        verifyNoMoreInteractions(restTemplate);
    }

    @Test
    void whenQuantityAboveLimit_thenInventoryDTOHasEstoqueBaixoFalse() throws Exception {
        Long id = 2L;
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(id);
        productDTO.setNome("Produto Y");
        productDTO.setQuantidade(15);

        when(restTemplate.getForEntity("http://fake-url:8081/api/products/2", ProductDTO.class))
                .thenReturn(ResponseEntity.ok(productDTO));

        CompletableFuture<InventoryDTO> future = inventoryServiceValidation.checkStockStatus(id);
        InventoryDTO status = future.get();

        assertFalse(status.isEstoqueBaixo());
        assertEquals("Produto Y", status.getNome());
        assertEquals(15, status.getQuantidade());
        assertTrue(status.getMensagem().contains("Quantidade em estoque suficiente"));

        // ==== Verify aqui ====
        verify(restTemplate, times(1))
                .getForEntity("http://fake-url:8081/api/products/2", ProductDTO.class);
        verifyNoMoreInteractions(restTemplate);
    }

    @Test
    void whenProductNotFound_thenInventoryDTOHasErroProdutoNaoEncontrado() throws Exception {
        Long id = 3L;

        // Simula retorno com corpo null
        when(restTemplate.getForEntity("http://fake-url:8081/api/products/3", ProductDTO.class))
                .thenReturn(ResponseEntity.ok(null));

        CompletableFuture<InventoryDTO> future = inventoryServiceValidation.checkStockStatus(id);
        InventoryDTO status = future.get();

        assertTrue(status.isEstoqueBaixo());
        assertEquals(id, status.getId());
        assertNull(status.getNome());
        assertEquals(0, status.getQuantidade());
        assertEquals("Produto não encontrado", status.getMensagem());

        // ==== Verify aqui ====
        verify(restTemplate, times(1))
                .getForEntity("http://fake-url:8081/api/products/3", ProductDTO.class);
        verifyNoMoreInteractions(restTemplate);
    }
}
