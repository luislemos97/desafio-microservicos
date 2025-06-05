package com.example.gerenciamento.produtos.mapper;

import com.example.gerenciamento.produtos.controller.ProductRequest;
import com.example.gerenciamento.produtos.controller.ProductResponse;
import com.example.gerenciamento.produtos.model.Product;

public class ProductMapper {

    // Converte ProductRequest em Product (para salvar/criar)
    public static Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setNome(request.getNome());
        product.setDescricao(request.getDescricao());
        product.setPreco(request.getPreco());
        product.setQuantidade(request.getQuantidade());
        return product;
    }

    // Converte Product em ProductResponse (para retornar ao cliente)
    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getNome(),
                product.getDescricao(),
                product.getPreco(),
                product.getQuantidade()
        );
    }
}
