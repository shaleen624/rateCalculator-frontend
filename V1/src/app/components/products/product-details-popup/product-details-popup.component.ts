import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details-popup',
  templateUrl: './product-details-popup.component.html',
  styleUrls: ['./product-details-popup.component.scss']
})
export class ProductDetailsPopupComponent {
  @Input() product: any;
  @Input() productFields!: any[];
  @Output() closeProductDetails: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateProduct: EventEmitter<any> = new EventEmitter<any>();

  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal) {
  }

  ngOnInit () {
    this.productForm = this.formBuilder.group({});
    this.buildForm();
  }

  ngOnChanges() {
    if (this.product) {
      this.buildForm();
    }
  }

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

  onCloseClick() {
    this.closeProductDetails.emit();
    this.modalService.dismissAll();
  }

  onUpdateClick() {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.product,
        ...this.productForm.value
      };
      this.updateProduct.emit(updatedProduct);
    }
  }

  // onAddNestedRowClick(fieldName: string) {
  //   const nestedRows = this.productForm.get(fieldName) as FormArray;
  //   const nestedFormGroup = this.formBuilder.group({});
  //   this.productFields.forEach((field) => {
  //     if (field.type !== 'nested') {
  //       nestedFormGroup.addControl(field.name, new FormControl(''));
  //     }
  //   });
  //   nestedRows.push(nestedFormGroup);
  // }

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
