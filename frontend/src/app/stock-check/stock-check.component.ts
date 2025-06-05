import { Component } from '@angular/core';
import { ProductService, Product, InventoryDTO } from '../product.service';

@Component({
  selector: 'app-stock-check',
  template: `
    <div class="stock-container">
      <h2>Consultar Estoque e Detalhes do Produto</h2>
      <div class="search-group">
        <label for="productId">ID do Produto</label>
        <input id="productId" [(ngModel)]="productId" type="number" />
        <button (click)="checkStock()" [disabled]="!productId" class="btn-check">
          Verificar
        </button>
      </div>

      <!-- Exibir dados do produto se existirem -->
      <div *ngIf="produto" class="product-details">
        <h3>Detalhes do Produto</h3>
        <p><strong>ID:</strong> {{ produto.id }}</p>
        <p><strong>Nome:</strong> {{ produto.nome }}</p>
        <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
        <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
        <p><strong>Quantidade em Cadastro:</strong> {{ produto.quantidade }}</p>
      </div>

      <!-- Exibir mensagem de estoque, aplicando classe se for baixo -->
      <p *ngIf="stockMessage"
         [ngClass]="{ 'stock-message': true, 'low': stockLow }">
        {{ stockMessage }}
      </p>

      <!-- Exibir erro caso não encontre produto -->
      <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .stock-container {
      max-width: 480px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 24px;
      text-align: center;
    }
    .stock-container h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #333;
    }
    .search-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin: 16px 0;
    }
    .search-group label {
      font-size: 0.9rem;
      color: #555;
      min-width: 80px;
      text-align: right;
    }
    .search-group input {
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 100px;
    }
    .search-group input:focus {
      border-color: #1976d2;
      outline: none;
    }
    .btn-check {
      padding: 8px 12px;
      font-size: 1rem;
      background-color: #1976d2;
      border: none;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-check:disabled {
      background-color: #9e9e9e;
      cursor: not-allowed;
    }
    .product-details {
      text-align: left;
      margin-top: 16px;
      border-top: 1px solid #ddd;
      padding-top: 16px;
    }
    .product-details p {
      margin: 4px 0;
    }
    .stock-message {
      margin-top: 16px;
      font-size: 1rem;
      font-weight: 500;
      /* cor padrão para estoque suficiente */
      color: #1976d2;
    }
    /* se for “estoque baixo”, a cor fica vermelha */
    .stock-message.low {
      color: red;
    }
    .error-message {
      margin-top: 16px;
      font-size: 1rem;
      color: red;
      font-weight: 500;
    }
    @media (max-width: 480px) {
      .search-group {
        flex-direction: column;
      }
      .search-group label {
        text-align: center;
      }
    }
  `]
})
export class StockCheckComponent {
  productId: number | null = null;
  produto: Product | null = null;
  stockMessage: string = '';
  stockLow: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductService) {}

  checkStock(): void {
    // resetar estados
    this.stockMessage = '';
    this.stockLow = false;
    this.errorMessage = '';
    this.produto = null;

    if (!this.productId) {
      this.errorMessage = 'Informe um ID válido.';
      return;
    }

    // 1) Buscar detalhes do produto no Service A
    this.productService.getProductById(this.productId).subscribe(
      (prod) => {
        this.produto = prod;

        // 2) Buscar estoque no Service B
        this.productService.checkStock(this.productId as number).subscribe(
          (dto: InventoryDTO) => {
            this.stockMessage = dto.mensagem;
            this.stockLow = dto.estoqueBaixo;
          },
          (err) => {
            if (err.status === 404) {
              this.stockMessage = 'Dados de estoque não encontrados.';
            } else {
              this.stockMessage = 'Erro ao consultar estoque.';
            }
            // Em caso de erro, não consideramos estoque baixo
            this.stockLow = false;
          }
        );
      },
      (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Produto não encontrado.';
        } else {
          this.errorMessage = 'Erro ao buscar produto.';
        }
      }
    );
  }
}
