import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {
  private baseUrl = BASE_URL; // Update the server URL if necessary

  constructor(private http: HttpClient) {}

  getAllReferenceData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reference-data`);
  }

  getReferenceDataById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reference-data/${id}`);
  }

  createReferenceData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reference-data`, data);
  }

  updateReferenceData(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/reference-data/${id}`, data);
  }

  deleteReferenceData(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reference-data/${id}`);
  }

  searchReferenceData(term: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reference-data/search?term=${term}`);
  }

  getCombinedDataByCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reference-data/combined-by-category`);
  }
  
  /////Product filelds

  getAllProductFileds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product-fields`);
  }
}
