import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "@products/components/product/product.component";
import { Product } from '@shared/models/Product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  ngOnInit(){
    this.productService.getProducts().subscribe({
      next: (prodcuts) => {
        this.products.set(prodcuts);
        console.log(prodcuts);
        
      },
      error: () => {

      }
    });
  }

  addToCart(product: Product){
    this.cartService.addToCart(product);
  }
}
