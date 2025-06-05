package com.example.consumo.produto.dto;

public class InventoryDTO {
    private final Long id;
    private final String nome;
    private final Integer quantidade;
    private final boolean estoqueBaixo;
    private final String mensagem;

    private InventoryDTO(Builder builder) {
        this.id = builder.id;
        this.nome = builder.nome;
        this.quantidade = builder.quantidade;
        this.estoqueBaixo = builder.estoqueBaixo;
        this.mensagem = builder.mensagem;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public boolean isEstoqueBaixo() {
        return estoqueBaixo;
    }

    public String getMensagem() {
        return mensagem;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String nome;
        private Integer quantidade;
        private boolean estoqueBaixo;
        private String mensagem;

        public Builder() {
            this.id = null;
            this.nome = null;
            this.quantidade = 0;
            this.estoqueBaixo = false;
            this.mensagem = null;
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nome(String nome) {
            this.nome = nome;
            return this;
        }

        public Builder quantidade(Integer quantidade) {
            this.quantidade = quantidade;
            return this;
        }

        public Builder estoqueBaixo(boolean estoqueBaixo) {
            this.estoqueBaixo = estoqueBaixo;
            return this;
        }

        public Builder mensagem(String mensagem) {
            this.mensagem = mensagem;
            return this;
        }

        public InventoryDTO build() {
            return new InventoryDTO(this);
        }
    }
}
