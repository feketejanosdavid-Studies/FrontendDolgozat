import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private url = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app'
  private dataSubject = new Subject();

  constructor(private http: HttpClient) {}

  getDatas() {
    return this.http.get(`${this.url}/.json`)
  }

  createData(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.post(`${this.url}/.json`, product)
  }

  updateData(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.put(`${this.url}/${product.id}.json`, product)
  }

  deleteData(id: string) {
    return this.http.delete(`${this.url}/${id}.json`)
  }
}
