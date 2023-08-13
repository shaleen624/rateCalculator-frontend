import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_PRODUCT_MOCK } from 'src/app/common/constants';
import { ReferenceDataService } from 'src/app/common/services/reference-data-service.service';

@Component({
  selector: 'app-product-details-popup',
  templateUrl: './product-details-popup.component.html',
  styleUrls: ['./product-details-popup.component.scss']
})
export class ProductDetailsPopupComponent {
  @Input() product: any;
  @Input() productFields!: any[];
 // @Output() closeProductDetails: EventEmitter<void> = new EventEmitter<void>();
 // @Output() updateProduct: EventEmitter<any> = new EventEmitter<any>();
  saveLabel= "Update";
  productForm!: FormGroup;
  materials!: any[];
  fabricArray!: any[];
  fiberArray!: any[];
  overallTotal: number=0;
  nestedTotals: any;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private referenceDataService: ReferenceDataService,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit () {
    this.saveLabel = "Update"
    this.productForm = this.formBuilder.group({});
    if (this.product) {
    this.buildForm();
    } else {
      this.createForm();
      this.saveLabel = "Add"
    }
    this.getMaterialRefData()
    this.calculateTotalPrice();
    // this.productForm.valueChanges.subscribe(() => {
    //   this.calculateTotalPrice();
    // });
  }

  getMaterialRefData (){
    this.referenceDataService.getCombinedDataByCategory().subscribe(
      (data: any[]) => {
        this.materials = data;

        console.log("this.materials", this.materials);
        data.forEach(ele => {
          if (ele.hasOwnProperty("fabric")) {
            this.fabricArray = ele.fabric;
          } else if (ele.hasOwnProperty("fiber")) {
            this.fiberArray = ele.fiber;
          }   
        });
        // Get individual arrays from the data object
         //this.fabricArray = data.map(obj => obj["fabric"]);
         //this.fiberArray = data.map(obj => obj["fiber"]);
         //this.fabricArray = data.map(obj => obj[Object.keys(obj)[0]])[0];
         //this.fiberArray = data.map(obj => obj[Object.keys(obj)[0]])[1];
         //this.fabricArray = data[0]['fabric'];
         //this.fiberArray = data[1]['fiber'];
         console.log("fiberArray", this.fiberArray);
         console.log("fabricArray", this.fabricArray);

      },
      (error: any) => {
        console.error('Error fetching product fields:', error);
      }
    );
  }

  ngOnChanges() {
    if (this.product) {
      this.buildForm();
      //this.calculateTotalPrice();
    } 
  }
  // Form for update operation
  buildForm() {
    this.productFields.forEach((field) => {
      if (field.type !== 'nested') {
        this.productForm.addControl(field.name, new FormControl(this.product[field.name]));
      } else {
        const nestedRows = this.formBuilder.array([]);
        this.product[field.name].forEach((nestedRow: any) => {
          const nestedFormGroup:any = this.formBuilder.group({});
          field.fields.forEach((nestedField: any) => {
            nestedFormGroup.addControl(nestedField.name, new FormControl(nestedRow[nestedField.name]));
          });
          nestedRows.push(nestedFormGroup);
        });
        this.productForm.addControl(field.name, nestedRows);
      }
    });
  }

  // Form for create product.
  createForm() {
    const formGroup:any = {};
    for (const field of this.productFields) {
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
    this.productForm.setValue(ADD_PRODUCT_MOCK);
  }

  // onMaterialSelect(event:any) {
  //   console.log(event);
  //   const selectedObject = event.target.value;
  //   console.log('Selected Material:', selectedObject);
   
  // }

  onMaterialSelect(event: any, fieldName: string, rowIndex: number) {
    const item = event.target.value;
    const arr = fieldName === 'fiber'? this.fiberArray: this.fabricArray;
    let selectedObject:any = {};
    arr.forEach(element => {
      if (item === element.item)
      selectedObject = element;
    });
    const nestedArray = this.productForm.get(fieldName) as FormArray;
    const nestedRow = nestedArray.at(rowIndex) as FormGroup;
    //const selectedObject:any = nestedRow.get('type')?.value;
    console.log('selectedObject', selectedObject)
    nestedRow.get('rate')?.setValue(selectedObject?.rate);
    nestedRow.get('unit')?.setValue(selectedObject?.unit);
    //nestedRow.get('type')?.setValue(selectedObject?.type );
    this.calculateTotalPrice();
  }

  test (item:any) {
    console.log('item', item)
  }



  onUpdateClick() {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.product,
        ...this.productForm.value
      };
      this.activeModal.close(updatedProduct)
      //this.updateProduct.emit(updatedProduct);
    }
  }

  onAddNestedRowClick(fieldName: string) {
    const nestedArray = this.productForm.get(fieldName) as FormArray;
    nestedArray.push(this.createNestedFormGroup());
  }

  createNestedFormGroup(): FormGroup {
    const nestedGroup:any = {};
    for (const field of this.productFields.find(field => field.type === 'nested').fields) {
      nestedGroup[field.name] = field.required ? ['', Validators.required] : '';
    }
    return this.formBuilder.group(nestedGroup);
  }

  onRemoveNestedRowClick(fieldName: string, rowIndex: number) {
    const nestedRows = this.productForm.get(fieldName) as FormArray;
    nestedRows.removeAt(rowIndex);
  }

  onSaveClick () {

  }

  calculateNestedTotal(nestedArray: FormArray): number {
    let nestedTotal = 0;

    nestedArray.controls.forEach((nestedRow: any) => {
      const rate = nestedRow.get('rate')?.value || 0;
      const qty = nestedRow.get('qty')?.value || 0;
      nestedTotal += rate * qty;
      nestedRow.get('total').setValue(nestedTotal);
    });

    return nestedTotal;
  }

  calculateTotalPrice(): number {
    console.log("calculateTotalPrice triggered")
    let totalPrice = 0;

    for (const field of this.productFields) {
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

  calculateOverallTotal() {
    this.overallTotal = 0;
    this.nestedTotals = [];

    for (const field of this.productFields) {
      if (field.type !== 'nested') {
        const fieldValue = this.productForm.get(field.name)?.value;
        if (fieldValue) {
          this.overallTotal += fieldValue.total || 0;
        }
      } else {
        const nestedArray = this.productForm.get(field.name) as FormArray;
        const nestedTotal = this.calculateNestedTotal(nestedArray);
        this.nestedTotals.push(nestedTotal);
        this.overallTotal += nestedTotal;
      }
    }
    this.productForm.get('totalPrice')?.setValue(this.overallTotal);
  }
  
}
