import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { medicine } from '../../models/medinfo';
import { AddmedPage } from '../addmed/addmed';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  @ViewChild('id') ids;
  @ViewChild('gname') gname;
  @ViewChild('bname') bname;
  @ViewChild('dosage') dosage;
  @ViewChild('unit') unit;
  @ViewChild('advice') advice;

  id: number;
  data: Observable<any>;
  result: any = [];
  medinfo = {} as medicine;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {

    this.id = navParams.get('id');
    console.log(this.id);
    this.displayvalues();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  displayvalues(){

    var url = "http://192.168.1.214.xip.io:8000/medicine/"+this.id+"/edit";
    
    console.log(url);
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      this.result = data;
      console.log(data);
    })
  }

  saveupdate(){

    var url = "http://192.168.1.214.xip.io:8000/medicine/"+this.id+"/update";

    this.medinfo.gname = this.gname.value;
    this.medinfo.bname = this.bname.value;
    this.medinfo.dosage = this.dosage.value;
    this.medinfo.unit = this.unit.value;
    this.medinfo.advice = this.advice.value;

    this.data = this.http.post(url,this.medinfo);
    this.data.subscribe(data =>{
    console.log(data);
  }) 
  this.navCtrl.setRoot(AddmedPage);
  }

}
