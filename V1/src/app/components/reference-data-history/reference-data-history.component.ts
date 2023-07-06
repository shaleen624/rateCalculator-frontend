import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HistoryService } from '../../common/services/history.service';

@Component({
  selector: 'app-reference-data-history',
  templateUrl: './reference-data-history.component.html',
  styleUrls: ['./reference-data-history.component.scss']
})
export class ReferenceDataHistoryComponent implements OnInit, OnDestroy {
  searchTerm!: string;
  filterOption: string = 'all';
  startDate!: NgbDateStruct;
  endDate!: NgbDateStruct;
  history: any[] = [];
  filteredHistory: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 0;
  pageSize: number = 25;
  totalRecords: number = 0;
  private subscription!: Subscription;
  sortKey: string = ''; // The key to sort by
  sortDirection: 'asc' | 'desc' = 'asc'; // The sort direction (asc or desc)


  @ViewChild('datePickerStart')
  datePickerStart!: NgbInputDatepicker;
  @ViewChild('datePickerEnd')
  datePickerEnd!: NgbInputDatepicker;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.loadMoreData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onScroll(): void {
    if (!this.isLoading && this.hasMoreRecords()) {
      this.loadMoreData();
    }
  }

  updateDateRange(): void {
    this.currentPage = 0;
    this.filteredHistory = [];
    this.loadMoreData();
  }

  sortData(key: string): void {
    if (key === this.sortKey) {
      // If the same key is clicked, toggle the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different key is clicked, set the new sort key and default to ascending order
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

   this.applySorting();
  }
  
  applySorting(): void {
    this.filteredHistory.sort((a, b) => {
      const valueA = a[this.sortKey];
      const valueB = b[this.sortKey];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  loadMoreData(): void {
    const today = new Date();
    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, today.getDate());
    const start = this.startDate ? new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day) : twoMonthsAgo;
    const end = this.endDate ? new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day) : today;

    this.isLoading = true;
    this.subscription = this.historyService.getDataByDateRange(start, end, this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.history = [...this.history, ...data.items];
        this.filteredHistory = [...this.filteredHistory, ...data.items];
        this.totalRecords = data.totalRecords;
        this.isLoading = false;
        this.currentPage++;
      },
      (error: any) => {
        console.error('Error while loading more data:', error);
        this.isLoading = false;
      }
    );
  }

  searchHistory(): void {
    // Implement search logic here
    // You can filter the `history` array based on the `searchTerm`
    // and update the `filteredHistory` array accordingly
    // Example:
    this.filteredHistory = this.history.filter(item => item.oldData.item.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  filterHistory(): void {
    // Implement filter logic here
    // You can filter the `history` array based on the `filterOption`
    // and update the `filteredHistory` array accordingly
    // Example:
    if (this.filterOption === 'all') {
      this.filteredHistory = [...this.history];
    } else {
      this.filteredHistory = this.history.filter(item => item.action === this.filterOption);
    }
  }

  hasMoreRecords(): boolean {
    return this.totalRecords > this.currentPage * this.pageSize;
  }
}
