package com.example.consumo.produto.dto;

public class InventoryDTO {
    private Long id;
    private String nome;
    private Integer quantidade;
    private boolean estoqueBaixo;
    private String mensagem;

    public InventoryDTO() {
    }

    public InventoryDTO(Long id, String nome, Integer quantidade, boolean estoqueBaixo, String mensagem) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
        this.estoqueBaixo = estoqueBaixo;
        this.mensagem = mensagem;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public boolean isEstoqueBaixo() {
        return estoqueBaixo;
    }

    public void setEstoqueBaixo(boolean estoqueBaixo) {
        this.estoqueBaixo = estoqueBaixo;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
