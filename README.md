## Desafio Microserviços: Gerenciamento de Produtos e Validação de Estoque

Este repositório contém um sistema composto por dois microserviços Java (Service A e Service B) e um container MySQL, orquestrados via Docker Compose.

**Service A** (gerenciamento-produtos) faz CRUD de produtos em um banco MySQL com Flyway para migrações.

**Service B** (consumo-produto) consulta o Service A para validar o estoque (stock check), aplicando regras de negócio (Circuit Breaker, TimeLimiter, Cache).

## Pré-requisitos

- Java 17
- Spring Boot 3.2
- Spring Web (REST)
- Spring Data JPA (no Service A)
- Resilience4j (Circuit Breaker e TimeLimiter, no Service B)
- Flyway (para migrações no Service A)
- MySQL 8
- Maven 3.8+
- JUnit 5 & Mockito (testes unitários)
- Docker & Docker Compose

## Como executar

1. **Build dos serviços**  
   No diretório `service-a`:
   ```bash
   mvn clean package
   ```
   No diretório `service-b`:
   ```bash
   mvn clean package
   ```

2. **Executar com Docker Compose**  
   1. Pré-requisitos
- Docker Desktop instalado (inclui Docker Engine e Docker Compose).

- Java 17 e Maven (caso queira rodar sem Docker).

2. Rodando com Docker Compose (recomendado)
- Na raiz do repositório, edite, se necessário, as credenciais do MySQL em docker-compose.yml:

services:
mysql:
image: mysql:8
environment:
MYSQL_DATABASE: produtos_db
MYSQL_ROOT_PASSWORD: root
ports:
- "3306:3306"
volumes:
- mysql-data:/var/lib/mysql
healthcheck:
test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
interval: 10s
timeout: 5s
retries: 5

gerenciamento-produtos:
build: ./gerenciamento-produtos
environment:
SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/produtos_db
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: root
ports:
- "8081:8081"
depends_on:
mysql:
condition: service_healthy

consumo-produto:
build: ./consumo-produto
environment:
SERVICE_A_URL: http://gerenciamento-produtos:8081
ports:
- "8082:8082"
depends_on:
- gerenciamento-produtos

volumes:
mysql-data:

Observações:

**Service A** (gerenciamento-produtos) expõe a porta 8081.

**Service B**(consumo-produto) expõe a porta 8082 e consome Service A via http://gerenciamento-produtos:8081.

MySQL roda na porta 3306, com banco produtos_db e usuário/senha root/root.

Execute:

- docker compose up --build

- Aguarde até ver as mensagens de inicialização:
- gerenciamento-produtos | Started ServiceAApplication in XX seconds
- consumo-produto | Started ServiceBApplication in XX seconds

- Verifique:

**Service A** em http://localhost:8081/api/products

**Service B** em http://localhost:8082/api/inventory/{id}

- Exemplo de requisição ao Service B:
curl http://localhost:8082/api/inventory/1

- Resposta esperada:
{
"id": 1,
"nome": "Produto X",
"quantidade": 5,
"estoqueBaixo": true,
"mensagem": "Quantidade em estoque baixa: 5"
}

**Para parar:**
docker compose down

## Flyway

As migrações do banco de dados para o **service-a** estão em `service-a/src/main/resources/db/migration`.

## Testes

Execute os testes de ambos os módulos:

**Na raiz, cada módulo pode ser testado separadamente:**
cd gerenciamento-produtos
mvn test

cd ../consumo-produto
mvn test

**Ou, na raiz com Maven multi-módulos:**
mvn clean test



