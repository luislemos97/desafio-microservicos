package com.example.consumo.produto.service;

import com.example.consumo.produto.dto.InventoryDTO;
import com.example.consumo.produto.dto.ProductDTO;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

import static java.util.Objects.isNull;

@Service
public class InventoryServiceValidation {

    private final RestTemplate restTemplate;
    private final String serviceAUrl;
    private static final int LIMITE_MINIMO = 10;

    public InventoryServiceValidation(
        @Value("${SERVICE_A_URL:http://localhost:8081}") String serviceAUrl,
        RestTemplate restTemplate
    ) {
        this.restTemplate = restTemplate;
        this.serviceAUrl = serviceAUrl;
    }

    @CircuitBreaker(name = "gerenciamentoProdutos", fallbackMethod = "fallbackInventory")
    @TimeLimiter(name = "gerenciamentoProdutos")
    public CompletableFuture<InventoryDTO> checkStockStatus(Long id) {
        return CompletableFuture.supplyAsync(() -> {
            ProductDTO product = restTemplate
                    .getForEntity(
                        serviceAUrl + "/api/products/" + id,
                        ProductDTO.class
                    )
                    .getBody();

            if (isNull(product)) {
                return InventoryDTO.builder()
                        .id(id)
                        .nome(null)
                        .quantidade(0)
                        .estoqueBaixo(true)
                        .mensagem("Produto não encontrado")
                        .build();
            }

            boolean estoqueBaixo = product.getQuantidade() < LIMITE_MINIMO;
            String mensagem = estoqueBaixo
                    ? "Quantidade em estoque baixa: " + product.getQuantidade()
                    : "Quantidade em estoque suficiente: " + product.getQuantidade();

            return InventoryDTO.builder()
                    .id(product.getId())
                    .nome(product.getNome())
                    .quantidade(product.getQuantidade())
                    .estoqueBaixo(estoqueBaixo)
                    .mensagem(mensagem)
                    .build();
        });
    }

    public CompletableFuture<InventoryDTO> fallbackInventory(Long id, Throwable ex) {
        String msgFallback = "Serviço A fora do ar ou erro: " + ex.getMessage();
        return CompletableFuture.completedFuture(
                InventoryDTO.builder()
                        .id(id)
                        .nome("Desconhecido")
                        .quantidade(0)
                        .estoqueBaixo(true)
                        .mensagem(msgFallback)
                        .build()
        );
    }
}
