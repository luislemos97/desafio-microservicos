package com.example.gerenciamento.produtos.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class ProductRequest {

    @NotBlank(message = "O campo nome deve está preenchido")
    private String nome;

    @Size(min = 3, max = 200, message = "A descrição deve ter entre 3 e 200 caracteres")
    private String descricao;

    @Positive(message = "O preço deve ser positivo")
    private Double preco;

    @Positive(message = "A quantidade deve ser positiva")
    private Integer quantidade;

    // getters e setters
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }
    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
