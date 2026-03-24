// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {


//    // Toast notification state
//   toast = { show: false, message: '', type: '' };

//   products: any[] = []; // all products list
//   product = { name: '', price: 0, description: '' }; // new product form data
//   editingProduct: any = null; // currently editing product

//   constructor(private productService: ProductService) { }

//   ngOnInit() {
//     this.loadProducts(); // load products on init
//   }

//   // fetch all products, reverse to show latest first
//   loadProducts() {
//     this.productService.getProducts()
//       .subscribe((res: any) => this.products = res.reverse());
//   }

//   // create product then refresh list and reset form
//   addProduct() {
//     this.productService.createProduct(this.product)
//       .subscribe(() => {
//         this.loadProducts();
//         this.product = { name: '', price: 0, description: '' };
//       });
//   }

//   // delete by id then refresh list
//   deleteProduct(id: string) {
//     this.productService.deleteProduct(id)
//       .subscribe(() => this.loadProducts());
//   }

//   startEdit(p: any) {
//     this.editingProduct = { ...p }; // copy product to avoid direct mutation
//   }

//   // save changes then refresh list and close modal
//   saveEdit() {
//     this.productService.updateProduct(this.editingProduct._id, this.editingProduct)
//       .subscribe(() => {
//         this.loadProducts();
//         this.editingProduct = null;
//       });
//   }

//   cancelEdit() {
//     this.editingProduct = null; // close modal without saving
//   }


//    // Show toast message for 3 seconds
//   showToast(message: string, type: 'success' | 'error') {
//     this.toast = { show: true, message, type };
//     setTimeout(() => this.toast.show = false, 3000);
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Toast notification state
  toast = { show: false, message: '', type: '' };

  products: any[] = []; // all products list
  product = { name: '', price: 0, description: '' }; // new product form data
  editingProduct: any = null; // currently editing product

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts(); // load products on init
  }

  // fetch all products, reverse to show latest first
  loadProducts() {
    this.productService.getProducts()
      .subscribe({
        next: (res: any) => this.products = res.reverse(),
        error: (err) => this.showToast(err.error?.message || 'Failed to load products', 'error')
      });
  }

  // create product then refresh list and reset form
  addProduct() {
    this.productService.createProduct(this.product)
      .subscribe({
        next: () => {
          this.loadProducts();
          this.product = { name: '', price: 0, description: '' };
          this.showToast('Product added successfully!', 'success');
        },
        error: (err) => this.showToast(err.error?.message || 'Failed to add product', 'error')
      });
  }

  // delete by id then refresh list
  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe({
        next: () => {
          this.loadProducts();
          this.showToast('Product deleted successfully!', 'success');
        },
        error: (err) => this.showToast(err.error?.message || 'Failed to delete product', 'error')
      });
  }

  startEdit(p: any) {
    this.editingProduct = { ...p }; // copy product to avoid direct mutation
  }

  // save changes then refresh list and close modal
  saveEdit() {
    this.productService.updateProduct(this.editingProduct._id, this.editingProduct)
      .subscribe({
        next: () => {
          this.loadProducts();
          this.editingProduct = null;
          this.showToast('Product updated successfully!', 'success');
        },
        error: (err) => this.showToast(err.error?.message || 'Failed to update product', 'error')
      });
  }

  cancelEdit() {
    this.editingProduct = null; // close modal without saving
  }

  // show toast message for 3 seconds
  showToast(message: string, type: 'success' | 'error') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 3000);
  }

}