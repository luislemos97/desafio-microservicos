import { Component } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-form',
  template: `
    <div class="form-container">
      <h2>Cadastrar Produto</h2>
      <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="product-form">
        <div class="form-group">
          <label for="id">ID</label>
          <input id="id" type="number" [(ngModel)]="product.id" name="id" required>
        </div>
        <div class="form-group">
          <label for="nome">Nome</label>
          <input id="nome" type="text" [(ngModel)]="product.nome" name="nome" required>
        </div>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <input id="descricao" type="text" [(ngModel)]="product.descricao" name="descricao">
        </div>
        <div class="form-group">
          <label for="preco">Preço (R$)</label>
          <input id="preco" type="number" step="0.01" [(ngModel)]="product.preco" name="preco" required>
        </div>
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input id="quantidade" type="number" [(ngModel)]="product.quantidade" name="quantidade" required>
        </div>
        <button type="submit" class="btn-submit" [disabled]="!productForm.form.valid">
          Salvar
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 480px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 24px;
    }
    .form-container h2 {
      margin-top: 0;
      font-size: 1.5rem;
      color: #333;
      text-align: center;
    }
    .product-form {
      display: flex;
      flex-direction: column;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }
    .form-group label {
      font-size: 0.9rem;
      margin-bottom: 4px;
      color: #555;
    }
    .form-group input {
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .form-group input:focus {
      border-color: #1976d2;
      outline: none;
    }
    .btn-submit {
      padding: 10px 16px;
      font-size: 1rem;
      background-color: #1976d2;
      border: none;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      align-self: flex-end;
    }
    .btn-submit:disabled {
      background-color: #9e9e9e;
      cursor: not-allowed;
    }
    @media (max-width: 480px) {
      .form-container {
        padding: 16px;
      }
      .btn-submit {
        width: 100%;
        align-self: center;
      }
    }
  `]
})
export class ProductFormComponent {
  product: Product = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    quantidade: 0
  };

  constructor(private productService: ProductService) {}

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(() => {
      alert('Produto criado com sucesso!');
      // Limpar formulário
      this.product = { id: 0, nome: '', descricao: '', preco: 0, quantidade: 0 };
    });
  }
}
