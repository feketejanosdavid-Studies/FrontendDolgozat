import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app'
  private dataSubject = new Subject();

  constructor(private http: HttpClient) {
    this.loadAllDatas();
   }

   loadAllDatas() {
    return this.http.get(this.url).subscribe(
      (data) => this.dataSubject.next(data)
    )
   }

   getAllDatas() {
    return this.dataSubject
   }

   createNewData(data: any) {
    return this.http.post(this.url, data).subscribe(
      () => this.loadAllDatas())
   }

   updateData(id: number, data: any) {
    return this.http.put(this.url+id, data).subscribe(
      () => this.loadAllDatas())
   }

   deleteData(id: number) {
    return this.http.delete(this.url+id).subscribe(
      () => this.loadAllDatas())
   }
}
