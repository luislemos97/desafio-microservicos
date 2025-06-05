// src/app/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Model para o produto (Service A)
export interface Product {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
}

// Model para o DTO de estoque (Service B)
export interface InventoryDTO {
  id: number;
  nome: string;
  quantidade: number;
  estoqueBaixo: boolean;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';
  private stockUrl = 'http://localhost:8082/api/inventory';

  constructor(private http: HttpClient) { }

  // CRUD produtos
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  // **NOVO**: buscar produto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Status de estoque
  checkStock(id: number): Observable<InventoryDTO> {
    return this.http.get<InventoryDTO>(`${this.stockUrl}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
