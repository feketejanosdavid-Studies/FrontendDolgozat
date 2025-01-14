import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  constructor(private base: BaseService) {}

  language = 'en';

  datas : any

  columns = [
    {key: "id", title:"#", type:"plain"},
    {key: "category", title:"category", type:"text"},
    {key: "description", title:"description", type:"text"},
    {key: "name", title:"name", type:"text"},
    {key: "price", title:"price", type:"number"},
    
  ]

  translations: { [key: string]: { [key: string]: string } } = {
    en: {
      TITLE: 'Product Customization',
      NAME: 'Name',
      CATEGORY: 'Category',
      DESCRIPTION: 'Description',
      PRICE: 'Price',
    },
    hu: {
      TITLE: 'Termék szerkesztés',
      NAME: 'Név',
      CATEGORY: 'Kategória',
      DESCRIPTION: 'Leírás',
      PRICE: 'Ár',
    }
  };

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
      this.loadAllDatas();
      this.newData = { id: null, name: '', category: '', description: '', price: null }
    })
  }

  switchLang(lang: string) {

    this.language = lang; 
 
  }

  updateData(data: any) {
    data.price = parseFloat(data.price).toFixed(2)
    this.base.updateData(data).subscribe(() => this.loadAllDatas())
  }

  deleteData(data: {id: string}) {
    this.base.deleteData(data.id).subscribe(() => this.loadAllDatas())
  }
}
