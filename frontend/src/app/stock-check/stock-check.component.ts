import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-stock-check',
  template: `
    <h2>Consultar Estoque</h2>
    <label>ID do Produto: <input [(ngModel)]="productId" type="number"></label>
    <button (click)="checkStock()">Verificar</button>
    <p *ngIf="stockMessage">{{stockMessage}}</p>
  `
})
export class StockCheckComponent {
  productId: number = 0;
  stockMessage: string = '';

  constructor(private productService: ProductService) {}

  checkStock(): void {
    this.productService.checkStock(this.productId).subscribe(msg => this.stockMessage = msg);
  }
}