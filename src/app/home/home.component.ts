import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  constructor(private base: BaseService, private translate: TranslateService) {
    this.translate.addLangs(['en','hu']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  languagechange(lang: string): void {
    this.translate.use(lang);
  }
  
  datas : any

  columns = [
    {key: "id", title:"#", type:"plain"},
    {key: "category", title:"CATEGORY", type:"text"},
    {key: "description", title:"DESCRIPTION", type:"text"},
    {key: "name", title:"NAME", type:"text"},
    {key: "price", title:"PRICE", type:"number"},
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
      this.loadAllDatas();
      this.newData = { id: null, name: '', category: '', description: '', price: null }
    })
  }

  updateData(data: any) {
    data.price = parseFloat(data.price).toFixed(2)
    this.base.updateData(data).subscribe(() => this.loadAllDatas())
  }

  deleteData(data: {id: string}) {
    this.base.deleteData(data.id).subscribe(() => this.loadAllDatas())
  }
}
