import { Component } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-form',
  template: `
    <h2>Cadastrar Produto</h2>
    <form (ngSubmit)="onSubmit()" #productForm="ngForm">
      <label>Id: <input type="number" [(ngModel)]="product.id" name="id" required></label><br>
      <label>Nome: <input [(ngModel)]="product.nome" name="nome" required></label><br>
      <label>Descrição: <input [(ngModel)]="product.descricao" name="descricao"></label><br>
      <label>Preço: <input type="number" [(ngModel)]="product.preco" name="preco" required></label><br>
      <label>Quantidade: <input type="number" [(ngModel)]="product.quantidade" name="quantidade" required></label><br>
      <button type="submit">Salvar</button>
    </form>
  `
})
export class ProductFormComponent {
  product: Product = {id:0, nome: '', descricao: '', preco: 0, quantidade: 0 };

  constructor(private productService: ProductService) {}

  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(() => {
      alert('Produto criado com sucesso!');
      this.product = { id:0, nome: '', descricao: '', preco: 0, quantidade: 0 };
    });
  }
}