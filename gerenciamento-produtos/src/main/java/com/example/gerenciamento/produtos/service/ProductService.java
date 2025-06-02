package com.example.gerenciamento.produtos.service;

import com.example.gerenciamento.produtos.model.Product;
import com.example.gerenciamento.produtos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public Product save(Product product) {
        // Validações básicas:
        if (product == null) {
            throw new IllegalArgumentException("Produto não pode ser nulo");
        }
        if (!StringUtils.hasText(product.getNome())) {
            throw new IllegalArgumentException("Nome do produto é obrigatório");
        }
        if (product.getPreco() == null || product.getPreco() < 0) {
            throw new IllegalArgumentException("Preço do produto não pode ser negativo ou nulo");
        }
        if (product.getQuantidade() == null || product.getQuantidade() < 0) {
            throw new IllegalArgumentException("Quantidade do produto não pode ser negativa ou nula");
        }
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
