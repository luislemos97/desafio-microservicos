import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <h2>Lista de Produtos</h2>
    <ul>
      <li *ngFor="let product of products">
        {{product.nome}} - {{product.descricao}} - R$ {{product.preco}} - Estoque: {{product.quantidade}}
      </li>
    </ul>
  `
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => this.products = data);
  }
}