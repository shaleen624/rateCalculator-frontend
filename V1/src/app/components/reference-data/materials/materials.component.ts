import { Component } from '@angular/core';
import { MATERIALS_CATEGRY, UNITS } from 'src/app/common/constants';
import { ReferenceDataService } from 'src/app/common/services/reference-data-service.service';


interface DataRow {
  _id: string;
  item: string;
  category: string,
  rate: number;
  unit: string;
  editMode: boolean;
}

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent {
  referenceData!: any[];
  data: DataRow[] = [];
  units = UNITS;
  matCatgry = MATERIALS_CATEGRY;
  addingNewRow: boolean = false;
  newRow: DataRow = {
    _id: '',
    item: '',
    category: '',
    rate: 0,
    unit: '',
    editMode: false
  };
  filteredReferenceData!: any[];
  searchTerm: string = '';
  filterTerm: string = '';


  constructor(private referenceDataService: ReferenceDataService) {}

  ngOnInit(): void {
    this.loadReferenceData();
  }

  loadReferenceData(): void {
    this.referenceDataService.getAllReferenceData().subscribe(
      (data: any) => {
        this.referenceData = data;
        this.filteredReferenceData = data;
      },
      (error: any) => {
        console.error('Error while loading reference data:', error);
      }
    );
  }

  filterReferenceData(): void {
    if (this.filterTerm.trim() === '') {
      this.filteredReferenceData = this.referenceData;
      return;
    }

    this.filteredReferenceData = this.referenceData.filter((data: any) =>
      data.item.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  searchReferenceData(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredReferenceData = this.referenceData;
      return;
    }

    this.referenceDataService.searchReferenceData(this.searchTerm).subscribe(
      (data: any) => {
        this.filteredReferenceData = data;
      },
      (error: any) => {
        console.error('Error while searching reference data:', error);
      }
    );
  }

  createReferenceData(row:any): void {
    //const newData = { item: 'New Item', rate: 0, unit: 'New Unit' };
    this.referenceDataService.createReferenceData(row).subscribe(
      (data: any) => {
        console.log('Reference data created successfully:', data);
        this.loadReferenceData(); // Refresh the data after creation
      },
      (error: any) => {
        console.error('Error while creating reference data:', error);
      }
    );
  }

  updateReferenceData(id: string, updatedData: any): void {
    this.referenceDataService.updateReferenceData(id, updatedData).subscribe(
      (data: any) => {
        console.log('Reference data updated successfully:', data);
        this.loadReferenceData(); // Refresh the data after update
      },
      (error: any) => {
        console.error('Error while updating reference data:', error);
      }
    );
  }

  deleteReferenceData(id: string): void {
    this.referenceDataService.deleteReferenceData(id).subscribe(
      () => {
        console.log('Reference data deleted successfully');
        this.loadReferenceData(); // Refresh the data after deletion
      },
      (error: any) => {
        console.error('Error while deleting reference data:', error);
      }
    );
  }

  addNewRow() {
    this.addingNewRow = true;
  }

  editRow(row: DataRow) {
    row.editMode = true;
  }

  clear() {
    this.filterTerm = "";
    this.searchTerm = "";
    this.filteredReferenceData = this.referenceData;
  }

  cancelNewRow() {
    this.addingNewRow = false;
    this.newRow = {
      _id: '',
      item: '',
      category: '',
      rate: 0,
      unit: '',
      editMode: false
    };
  }

  cancelEdit(row: DataRow) {
    // Reset the row to its original state
    this.loadReferenceData();
  }

  addHistory(row: DataRow) {
    // Make an HTTP call to add the previous version of the row to the history in your Node.js backend API
    /* this.http.post('/api/reference-data/history', row).subscribe(() => {
      console.log('History added successfully');
    }); */
  }

}
