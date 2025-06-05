package com.example.gerenciamento.produtos.service;

import com.example.gerenciamento.produtos.model.Product;
import com.example.gerenciamento.produtos.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public Product save(Product product) {
        // 1) Produto == null
        if (product == null) {
            throw new IllegalArgumentException("Produto não pode ser nulo");
        }
        // 2) nome nulo ou vazio
        if (product.getNome() == null || product.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Nome do produto é obrigatório");
        }
        // 3) preço nulo ou ≤ 0
        if (product.getPreco() == null || product.getPreco() <= 0) {
            throw new IllegalArgumentException("Preço do produto não pode ser negativo ou nulo");
        }
        // 4) quantidade nulo ou ≤ 0
        if (product.getQuantidade() == null || product.getQuantidade() <= 0) {
            throw new IllegalArgumentException("Quantidade do produto não pode ser negativa ou nula");
        }

        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
