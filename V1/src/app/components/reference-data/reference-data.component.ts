import { Component, OnInit } from '@angular/core';
import { ReferenceDataService } from '../../common/services/reference-data-service.service';


@Component({
  selector: 'app-reference-data',
  templateUrl: './reference-data.component.html',
  styleUrls: ['./reference-data.component.scss']
})
export class ReferenceDataComponent {
  list = ['Material', 'Product table fields']
  refData:string=this.list[0];
  
  
}
