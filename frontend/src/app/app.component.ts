import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Gestão de Produtos</h1>
    <app-product-form></app-product-form>
    <hr>
    <app-product-list></app-product-list>
    <hr>
    <app-stock-check></app-stock-check>
  `,
})
export class AppComponent {}