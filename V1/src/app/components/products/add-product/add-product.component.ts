import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../../../common/services/product.service';
import { ReferenceDataService } from 'src/app/common/services/reference-data-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  products: any[] = [];
  newProduct: any = {
    fabrics: [],
    fibers: []
  };
  productForm!: FormGroup;
  formConfig: any[] = []

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private referenceDataService: ReferenceDataService
    ) { }

  ngOnInit(): void {
    //this.formConfig = formConfigMock
    this.fetchProductFields();
    
  }

  fetchProductFields(): void {
    this.referenceDataService.getAllProductFileds()
      .subscribe(
        (data) => {
          this.formConfig = data;
          this.createForm();
    this.calculateTotalPrice();
        },
        (error) => {
          console.error('Error while fetching products', error);
        }
      );
  }

  
  createForm() {
    const formGroup:any = {};
    for (const field of this.formConfig) {
      if (field.type === 'nested') {
        const nestedGroup:any = this.formBuilder.array([]);
        formGroup[field.name] = nestedGroup;
        nestedGroup.push(this.createNestedFormGroup());
      } else {
        formGroup[field.name] = field.required ? ['', Validators.required] : '';
      }
    }
    this.productForm = this.formBuilder.group(formGroup);

    // Set mock values
    this.productForm.setValue({
      name: 'Product 1',
      size: 'Medium',
      category: 'Category 1',
      fabric: [{
        type: 'Fabric Type',
        rate: 10,
        qty: 2,
        unit: 'Meters',
        total: ''
      }],
      fiber: [{
        type: 'Fiber Type',
        rate: 5,
        qty: 3,
        unit: 'Kilograms',
        total: 15
      }],
      cutting: '10',
      stitching: '10',
      finishing: '10',
      printEmb: '10',
      eyeNose: '15',
      bow: '5',
      packing: '5',
      chainLock: '5',
      overhead: '5',
      others: '0',
      totalPrice: ''
    });
  }

  createNestedFormGroup(): FormGroup {
    const nestedGroup:any = {};
    for (const field of this.formConfig.find(field => field.type === 'nested').fields) {
      nestedGroup[field.name] = field.required ? ['', Validators.required] : '';
    }
    return this.formBuilder.group(nestedGroup);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;

    for (const field of this.formConfig) {
      if (field.name !== 'totalPrice' && field.name !== 'name' && field.name !== 'size' && field.name !== 'category' && field.type !== 'nested') {
        const fieldValue = this.productForm?.get(field.name)?.value;
        totalPrice += fieldValue ? +fieldValue : 0;
      } else if (field.type === 'nested') {
        const nestedArray:any = this.productForm.get(field.name) as FormArray;
        for (const nestedRow of nestedArray.controls) {
          const rate = nestedRow.get('rate').value;
          const qty = nestedRow.get('qty').value;
          if (rate && qty) {
            const total = rate * qty;
            nestedRow.get('total').setValue(total);
            //nestedRow.patchValue({ total });
            totalPrice += total;
          }
        }
      }
    }
    this.productForm.get('totalPrice')?.setValue(totalPrice);


    return totalPrice;
  }


  addProduct(): void {
    this.productService.addProduct(this.newProduct)
      .subscribe(
        (response) => {
          console.log('Product added successfully', response);
          // Reset the form fields
          this.productForm.reset();
          // Fetch the updated list of products
          //this.fetchProducts();
        },
        (error) => {
          console.error('Error while adding product', error);
        }
      );
  }

  // Save the product
  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;

    this.productService.addProduct(productData).subscribe(
      (response) => {
        console.log('Product saved successfully');
        // Reset the form
        this.productForm.reset();
      },
      (error) => {
        console.error('Failed to save product', error);
      }
    );
  }


  addNestedRow(fieldName: string) {
    const nestedArray = this.productForm.get(fieldName) as FormArray;
    nestedArray.push(this.createNestedFormGroup());
  }

  removeNestedRow(fieldName: string, rowIndex: number) {
    const nestedArray = this.productForm.get(fieldName) as FormArray;
    nestedArray.removeAt(rowIndex);
  }

  addFabricRow(): void {
    this.newProduct.fabrics.push({});
  }

  removeFabricRow(index: number): void {
    this.newProduct.fabrics.splice(index, 1);
  }

  addFiberRow(): void {
    this.newProduct.fibers.push({});
  }

  removeFiberRow(index: number): void {
    this.newProduct.fibers.splice(index, 1);
  }

  clear () {
    this.productForm.reset();
  }

}
