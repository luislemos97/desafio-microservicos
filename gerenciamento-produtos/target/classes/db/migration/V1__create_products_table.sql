CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(500),
    preco DOUBLE,
    quantidade INT
);