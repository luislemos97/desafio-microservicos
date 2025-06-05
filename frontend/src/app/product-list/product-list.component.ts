import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="list-container">

      <!-- Título e Botão de Pesquisar -->
      <div class="header-list">
        <h2>Lista de Produtos</h2>
        <button (click)="loadProducts()" class="btn-search">
          Pesquisar Produtos
        </button>
      </div>

      <!-- Caso não haja produtos -->
      <p *ngIf="products.length === 0 && hasSearched" class="empty-msg">
        Nenhum produto encontrado.
      </p>

      <!-- Lista de produtos -->
      <ul *ngIf="products.length > 0" class="product-list">
        <li *ngFor="let product of products" class="product-item">
          <div class="item-info">
            <span class="item-name">{{ product.nome }}</span>
            <span class="item-desc">{{ product.descricao }}</span>
          </div>
          <div class="item-meta">
            <span>R$ {{ product.preco | number:'1.2-2' }}</span>
            <span>Estoque: {{ product.quantidade }}</span>
          </div>
          <div class="item-actions">
            <!-- Botão Editar (✏️) -->
            <button (click)="openEditModal(product)" class="btn-icon edit">
              ✏️
            </button>
            <!-- Botão Remover (🗑️) -->
            <button (click)="confirmDelete(product)" class="btn-icon delete">
              🗑️
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- =======================
         MODAL PARA ATUALIZAÇÃO
         ======================= -->
    <div class="modal-backdrop" *ngIf="editingProduct">
      <div class="modal-content">
        <h3>Atualizar Produto</h3>
        <form (ngSubmit)="onUpdate()" #editForm="ngForm" class="edit-form">
          <div class="form-group">
            <label for="editId">ID</label>
            <input id="editId" type="number" [(ngModel)]="editingProduct.id" name="editId" readonly>
          </div>
          <div class="form-group">
            <label for="editNome">Nome</label>
            <input id="editNome" type="text"
                   [(ngModel)]="editingProduct.nome" name="editNome" required>
          </div>
          <div class="form-group">
            <label for="editDescricao">Descrição</label>
            <input id="editDescricao" type="text"
                   [(ngModel)]="editingProduct.descricao" name="editDescricao">
          </div>
          <div class="form-group">
            <label for="editPreco">Preço (R$)</label>
            <input id="editPreco" type="number" step="0.01"
                   [(ngModel)]="editingProduct.preco" name="editPreco" required>
          </div>
          <div class="form-group">
            <label for="editQuantidade">Quantidade</label>
            <input id="editQuantidade" type="number"
                   [(ngModel)]="editingProduct.quantidade" name="editQuantidade" required>
          </div>

          <div class="modal-buttons">
            <button type="submit" class="btn-submit" [disabled]="!editForm.form.valid">
              Salvar Alterações
            </button>
            <button type="button" class="btn-cancel" (click)="closeEditModal()">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* ---------- Contêiner Geral da Lista ---------- */
    .list-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 24px;
    }
    .header-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .header-list h2 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }
    .btn-search {
      padding: 8px 14px;
      font-size: 1rem;
      background-color: #1976d2;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
    .btn-search:hover {
      background-color: #155a9c;
    }
    .empty-msg {
      text-align: center;
      color: #777;
      font-style: italic;
      margin-top: 24px;
    }

    /* ---------- Lista de Produtos ---------- */
    .product-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .product-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      padding: 12px 0;
    }
    .product-item:last-child {
      border-bottom: none;
    }
    .item-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 16px;
    }
    .item-name {
      font-weight: 600;
      font-size: 1rem;
      color: #1976d2;
    }
    .item-desc {
      font-size: 0.9rem;
      color: #555;
    }
    .item-meta {
      display: flex;
      flex-direction: column;
      text-align: right;
      font-size: 0.9rem;
      color: #333;
      margin-right: 16px;
      width: 120px;
    }
    .item-actions {
      display: flex;
      gap: 8px;
    }
    .btn-icon {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }
    .btn-icon.edit {
      color: #1976d2;
    }
    .btn-icon.edit:hover {
      background-color: rgba(25, 118, 210, 0.1);
    }
    .btn-icon.delete {
      color: #d32f2f;
    }
    .btn-icon.delete:hover {
      background-color: rgba(211, 47, 47, 0.1);
    }

    @media (max-width: 600px) {
      .product-item {
        flex-direction: column;
        align-items: flex-start;
      }
      .item-meta {
        margin: 8px 0 0 0;
        text-align: left;
      }
      .item-actions {
        margin-top: 8px;
      }
    }

    /* ---------- ESTILOS DO MODAL ---------- */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      width: 90%;
      max-width: 500px;
      padding: 24px;
      position: relative;
    }
    .modal-content h3 {
      margin-top: 0;
      font-size: 1.3rem;
      color: #333;
      text-align: center;
    }
    .edit-form {
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
    .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }
    .btn-submit {
      padding: 8px 14px;
      font-size: 1rem;
      background-color: #1976d2;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
    .btn-submit:disabled {
      background-color: #9e9e9e;
      cursor: not-allowed;
    }
    .btn-cancel {
      padding: 8px 14px;
      font-size: 1rem;
      background-color: #e0e0e0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #333;
    }
    .btn-cancel:hover {
      background-color: #d5d5d5;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  hasSearched: boolean = false;

  // Se não for nulo, estamos editando este produto
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Inicialmente, não carrega nada até clicar em "Pesquisar Produtos"
  }

  // 1) Carrega todos os produtos
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.hasSearched = true;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
        this.hasSearched = true;
      }
    });
  }

  // 2) Abre o modal e faz cópia do objeto para editar
  openEditModal(prod: Product): void {
    // Cria um novo objeto para não editar diretamente na lista (evita binding antecipado)
    this.editingProduct = { ...prod };
    // scroll para topo, se necessário
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Fecha o modal sem salvar
  closeEditModal(): void {
    this.editingProduct = null;
  }

  // 3) Submete a atualização
  onUpdate(): void {
    if (!this.editingProduct) {
      return;
    }
    this.productService.updateProduct(this.editingProduct).subscribe({
      next: (updated) => {
        // Atualiza a lista localmente (para refletir alteração sem ter que buscar de novo)
        const idx = this.products.findIndex(p => p.id === updated.id);
        if (idx > -1) {
          this.products[idx] = updated;
        }
        this.closeEditModal();
        alert('Produto atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Falha ao atualizar produto', err);
        alert('Erro ao atualizar produto.');
      }
    });
  }

  // 4) Confirmação antes de chamar o delete
  confirmDelete(prod: Product): void {
    const confirma = window.confirm(`Deseja realmente remover o produto "${prod.nome}" (ID: ${prod.id})?`);
    if (confirma) {
      this.productService.deleteProduct(prod.id).subscribe({
        next: () => {
          // Remove da lista local
          this.products = this.products.filter(p => p.id !== prod.id);
          alert('Produto removido com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao remover produto', err);
          alert('Falha ao remover produto.');
        }
      });
    }
  }
}
