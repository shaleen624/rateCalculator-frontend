import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../common/services/product.service';
import { Product } from 'src/app/common/Inteface';
import { ReferenceDataService } from 'src/app/common/services/reference-data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsPopupComponent } from './product-details-popup/product-details-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[]|any = [];
  productFields: any[] = []; // Array to store the product fields reference data
  selectedProduct: any;
  isPopupOpen: boolean = false;

  constructor(
    private productService: ProductService,
    private referenceDataService: ReferenceDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.fetchProductFields(); // Fetch the product fields reference data
    this.getProducts(); // Fetch the products data
  }

  fetchProductFields() {
    this.referenceDataService.getAllProductFileds().subscribe(
      (fields: any[]) => {
        this.productFields = fields;
      },
      (error: any) => {
        console.error('Error fetching product fields:', error);
      }
    );
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }

  editProduct(product: Product): void {
    // Assuming you have an editProduct method in the ProductService
    this.productService.editProduct(product).subscribe(
      (updatedProduct: Product) => {
        // Update the corresponding product in the products array
        const index = this.products.findIndex(
          (p:any) => p.id === updatedProduct.id
        );
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      },
      (error) => {
        console.error('Error editing product:', error);
      }
    );
  }

  deleteProduct(product: Product): void {
    // Assuming you have a deleteProduct method in the ProductService
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        // Remove the deleted product from the products array
        this.products = this.products.filter((p:any) => p.id !== product.id);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  openProductDetails(product: any) {
    const modalRef = this.modalService.open(ProductDetailsPopupComponent, { size: 'lg' });
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.productFields = this.productFields;

    modalRef.result.then(
      (result) => {
        if (result === 'update') {
          this.getProducts();
        }
      },
      (reason) => {}
    );
  }

  // openProductDetails(product: any) {
  //   this.selectedProduct = product;
  //   this.isPopupOpen = true;
  // }

  closeProductDetails() {
    this.selectedProduct = null;
    this.isPopupOpen = false;
  }
}
