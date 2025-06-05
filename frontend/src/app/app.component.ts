  import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <nav class="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><a routerLink="/manage-products" routerLinkActive="active">Gestão de Produtos</a></li>
          <li><a routerLink="/product-list" routerLinkActive="active">Lista de Produtos</a></li>
          <li><a routerLink="/stock-check" routerLinkActive="active">Consultar Estoque</a></li>
        </ul>
      </nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    /* Layout horizontal flexível */
    .app-container {
      display: flex;
      flex-direction: row;
      height: 100vh;
      margin: 0;
    }
    /* Sidebar fixa à esquerda */
    .sidebar {
      width: 220px;
      background-color: #f4f4f4;
      border-right: 1px solid #ddd;
      padding: 20px;
      box-sizing: border-box;
    }
    .sidebar h2 {
      margin-top: 0;
      font-size: 1.2rem;
      color: #333;
    }
    .sidebar ul {
      list-style: none;
      padding: 0;
    }
    .sidebar li {
      margin-bottom: 12px;
    }
    .sidebar a {
      text-decoration: none;
      color: #333;
      font-size: 1rem;
    }
    .sidebar a.active {
      font-weight: bold;
      color: #1976d2;
    }

    /* Área principal que exibe cada componente via router-outlet */
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      box-sizing: border-box;
      background-color: #fafafa;
    }

    /* Responsividade: em telas estreitas, sidebar vira menu superior */
    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
      }
      .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #ddd;
      }
    }
  `]
})
export class AppComponent { }
