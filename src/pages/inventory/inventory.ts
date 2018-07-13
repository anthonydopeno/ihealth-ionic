import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MedicinePage } from '../medicine/medicine';
//import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { medicine } from '../../models/medinfo';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {

  // @ViewChild('id') id;
  // @ViewChild('bname') bname;
  
  result: any = [];
  insert;
  data: Observable<any>;
  medinfo = {} as medicine;

  constructor(
    public navCtrl: NavController, 
    public http: HttpClient
  ){}

  // openMedicine(gname, bname, units, dosage, advice){
  //   gname = gname;
  //   bname = bname;
  //   units = units;
  //   dosage = dosage;
  //   advice = advice;

  //   // console.log(dosage);
    
  // 	this.navCtrl.push(MedicinePage, {
  //     data: gname, 
  //     data2: bname,
  //     data3: units,
  //     data4: dosage,
  //     data5: advice
  //   });
  // }

  display(){
      var url = "http://192.168.1.214.xip.io:8000/display";

      this.data = this.http.get(url);
      this.data.subscribe(data =>{
      this.result = data;
      console.log(this.result);
    })  
  }

  post(){
      var url = "http://192.168.1.214.xip.io:8000/insert";

      this.data = this.http.post(url,this.medinfo);
      this.data.subscribe(data =>{
      console.log(data);
    }) 
    console.log(this.medinfo);
    this.navCtrl.push(MedicinePage);
  }


  
}
