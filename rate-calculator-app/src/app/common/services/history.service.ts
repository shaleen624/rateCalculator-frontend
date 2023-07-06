import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDataByDateRange(start: Date, end: Date, page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('startDate', start.toISOString())
      .set('endDate', end.toISOString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/reference-data-history`, { params });
  }

  getTotalRecordCount(start: Date, end: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', start.toISOString())
      .set('endDate', end.toISOString());

    return this.http.get<any>(`${this.baseUrl}/reference-data-history/total-records`, { params });
  }
}
