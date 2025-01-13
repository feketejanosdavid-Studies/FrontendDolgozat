import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  datas:any

  constructor(private base: BaseService) {}

  columns = [
    {key: "id", title:"#", type:"plain"},
    {key: "category", title:"category", type:"text"},
    {key: "description", title:"description", type:"text"},
    {key: "name", title:"name", type:"text"},
    {key: "price", title:"price", type:"number"},
    
  ]

  newData: any = []

  ngOnInit() {
      this.loadAllDatas();
  }

  loadAllDatas() {
    this.base.getDatas().subscribe((data: any) => {
      this.datas = data ? Object.entries(data).map(([key, value]: any) => ({ ...value, id: key })) : []
    })
  }

  addData() {
    this.base.createData(this.newData).subscribe(() => {
      this.loadAllDatas()
    })
  }



}
