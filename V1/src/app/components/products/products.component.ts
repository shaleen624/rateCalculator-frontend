import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../common/services/product.service';
import { Product } from 'src/app/common/Inteface';
import { ReferenceDataService } from 'src/app/common/services/reference-data-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsPopupComponent } from './product-details-popup/product-details-popup.component';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | any = [];
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
    // If ID is there edit else add.
    //const product:Product = this.formatProduct(product1);
    //product.fiber = [{_id:"64a29c41057badf8ad3bd1ae"}]
    //product.fabric = [{_id:"64a29c41057badf8ad3bd1ae"}]
    if (product._id) {
      debugger
      this.productService.editProduct(product).subscribe(
        (updatedProduct: Product) => {
          this.updateProductTable(updatedProduct);
        },
        (error) => {
          console.error('Error editing product:', error);
        }
      );
    } else {
      this.productService.addProduct(product).subscribe(
        (updatedProduct: Product) => {
          this.updateProductTable(updatedProduct);
        },
        (error) => {
          console.error('Error editing product:', error);
        }
      );
    }
  }
  formatProduct(product1: Product) {
   
    // product1.forEach(ele => {
      
    // });
  }

  updateProductTable(updatedProduct: Product) {
    // Update the corresponding product in the products array
    const index = this.products.findIndex(
      (p: any) => p._id === updatedProduct._id
    );
    if (index !== -1) {
      this.products[index] = updatedProduct;
    } else {
      this.products.push(updatedProduct);
      this.getProducts();
    }
  }

  deleteProduct(product: Product): void {
    // Assuming you have a deleteProduct method in the ProductService
    this.productService.deleteProduct(product._id).subscribe(
      () => {
        // Remove the deleted product from the products array
        this.products = this.products.filter((p: any) => p.id !== product._id);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  openProductDetails(product?: any) {
    const modalRef = this.modalService.open(ProductDetailsPopupComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.productFields = this.productFields;
    // launch edit mode else add mode.
    if (product) {
      modalRef.componentInstance.product = product;
    }
    modalRef.result.then(
      (result) => {
        if (result) {
          console.log('Popup closed with data', result);
          this.editProduct(result);
        }
      },
      (reason) => {}
    );
  }

  closeProductDetails() {
    this.selectedProduct = null;
    this.isPopupOpen = false;
  }
}
