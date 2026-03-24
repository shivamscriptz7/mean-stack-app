import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  product = { name: '', price: 0, description: '' };
  editingProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts()
      .subscribe((res: any) => this.products = res);
  }

  addProduct() {
    this.productService.createProduct(this.product)
      .subscribe(() => {
        this.loadProducts();
        this.product = { name: '', price: 0, description: '' };
      });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => this.loadProducts());
  }

  startEdit(p: any) {
    this.editingProduct = { ...p };
  }

  saveEdit() {
    this.productService.updateProduct(this.editingProduct._id, this.editingProduct)
      .subscribe(() => {
        this.loadProducts(); // ✅ fixed: was getProducts()
        this.editingProduct = null;
      });
  }

  cancelEdit() {
    this.editingProduct = null;
  }



  
}