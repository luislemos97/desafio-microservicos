package com.example.consumo.produto.service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.consumo.produto.dto.ProductDTO;

import java.util.concurrent.CompletableFuture;

@Service
public class InventoryService {

    private final RestTemplate restTemplate;
    private final String serviceAUrl;

    public InventoryService(@Value("${SERVICE_A_URL:http://localhost:8081}") String serviceAUrl) {
        this.restTemplate = new RestTemplate();
        this.serviceAUrl = serviceAUrl;
    }

    @Cacheable("products")
    @CircuitBreaker(name = "gerenciamentoProdutos", fallbackMethod = "fallbackProduct")
    @Retry(name = "gerenciamentoProdutos")
    @TimeLimiter(name = "gerenciamentoProdutos")
    public CompletableFuture<ProductDTO> getProductById(Long id) {
        return CompletableFuture.supplyAsync(() -> {
            return restTemplate.getForObject(
                serviceAUrl + "/api/products/" + id,
                ProductDTO.class
            );
        });
    }

    public CompletableFuture<ProductDTO> fallbackProduct(Long id, Throwable ex) {
        ProductDTO fallback = new ProductDTO();
        fallback.setId(id);
        fallback.setNome("Unknown");
        fallback.setDescricao("gerenciamento de produtos fora do ar");
        fallback.setPreco(0.0);
        fallback.setQuantidade(0);
        return CompletableFuture.completedFuture(fallback);
    }
}
