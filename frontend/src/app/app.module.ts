import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { StockCheckComponent } from './stock-check/stock-check.component';

const routes: Routes = [
  { path: '', redirectTo: '/manage-products', pathMatch: 'full' },
  { path: 'manage-products', component: ProductFormComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'stock-check', component: StockCheckComponent },
  { path: '**', redirectTo: '/manage-products' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    StockCheckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
