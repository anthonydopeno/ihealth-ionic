import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Consultation } from '../../models/consultation';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the DconsultationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dconsultation',
  templateUrl: 'dconsultation.html',
})
export class DconsultationPage {

  puid;
  duid;
  dfname;
  dlname;
  data: Observable<any>;
  ddata: Observable<any>;
  result: any = [];
  dresult: any = [];
  twoarr: any = [];
  consultation = {} as Consultation;
  test: any = [];
  docf: any = [];
  did: any = [];
  cdate;

  @ViewChild('cduid') cduid;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DconsultationPage');
    this.cget();
    }

  post(){

    this.puid = this.navParams.get('puid');
    this.duid = this.navParams.get('duid');
    this.dfname = this.navParams.get('dfname');
    this.dlname = this.navParams.get('dlname');
    this.cdate = new Date().toLocaleString();

    this.consultation.duid = this.duid;
    this.consultation.puid = this.puid;
    this.consultation.dfname = this.dfname;
    this.consultation.dlname = this.dlname;
    this.consultation.cdate = this.cdate;

    console.log(this.consultation);
 

    var url = "http://192.168.1.214.xip.io:8000/inconsultation";
   
    this.data = this.http.post(url,this.consultation);
    this.data.subscribe(data =>{
      console.log(data);
      this.cget();
    }) 


  }

  cget(){

   /* var url = "http://127.0.0.1:8000/cget";
    console.log(url);
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      this.result = data;
      console.log(this.result);
    }) */

   /* this.test = {duid: this.cduid.value};
    this.docf = this.test;
    console.log(this.cduid.value); */



    this.puid = this.navParams.get('puid');
    this.duid = this.navParams.get('duid');

    this.consultation.duid = this.duid;
    this.consultation.puid = this.puid;

    var url = "http://192.168.1.214.xip.io:8000/cget";
    this.data = this.http.post(url,this.consultation);
    this.data.subscribe(data =>{
      //console.log(this.docf);
     this.result = data;
     console.log(data);

     //for(var i = 0; i < this.result.length; i++) {
     //console.log(data[i].cduid);
     //this.did = data.cduid;

     //this.test = {duid: this.did};
     //this.docf = this.test;
     //console.log(this.docf);

   //  }
    })
    /*
    var url = "http://127.0.0.1:8000/dget";
    this.ddata = this.http.post(url,this.consultation);
    this.ddata.subscribe(data =>{
      //console.log(this.docf);
     this.dresult = data;
      console.log(this.dresult);


     // this.twoarr.push({result: this.result.cmessage , dresult: this.dresult.fname});

    })
*/
//console.log(this.docf);

/*var url = "http://127.0.0.1:8000/dget";
this.data = this.http.post(url,this.consultation);
this.data.subscribe(data =>{
//console.log(this.docf);
this.dresult = data;
console.log(data);
})*/




  }



}
