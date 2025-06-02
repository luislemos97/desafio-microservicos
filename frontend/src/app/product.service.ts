import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/api/products';
  private stockUrl = 'http://localhost:8082/api/inventory';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  checkStock(id: number): Observable<string> {
    return this.http.get(`${this.stockUrl}/${id}`, { responseType: 'text' });
  }
}