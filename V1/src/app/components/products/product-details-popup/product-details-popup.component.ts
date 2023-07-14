import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD_PRODUCT_MOCK } from 'src/app/common/constants';

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

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
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
  }

  ngOnChanges() {
    if (this.product) {
      this.buildForm();
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
}
