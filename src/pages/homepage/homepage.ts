import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';

import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
//import { Observable } from '@firebase/util';
import { HomePage } from '../home/home';
//import { Camera } from 'ionic-native';
import firebase from 'firebase';
//import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PdetailsPage } from '../pdetails/pdetails';
import { AlertController } from 'ionic-angular';

import { Enroll } from '../../models/enroll';
import { DconsultationPage } from '../dconsultation/dconsultation';

/**
 * Generated class for the HomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homepage',
  templateUrl: 'homepage.html',
})
export class HomepagePage {

  profile = {} as Profile;
  enrolls = {} as Enroll;

  //doctorData$: FirebaseObjectObservable<Profile>;
 //doctorData: AngularFireObject<any>;;

 @ViewChild('docuid') docuid;

  test: any = [];
  docf: any = [];

  doctor;
  email: string;
  data: Observable<any>;
  data1: Observable<any>;
  duid: string;
  result: any = [];
  plist: any = [];
  notif: any = [];
  mnotif: any = [];

  nduid: string;
  npuid: string;
  length: string;

  pause: boolean = false;
  if: boolean = true;

 // picdata:any;
 // picurl:any;
 // mypicref:any;

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private base:AngularFireDatabase, public http: HttpClient,public app: App,public alertCtrl: AlertController) {

    this.email = fire.auth.currentUser.email;
    this.getDataFromFirebase();
    //this.duid = fire.auth.currentUser.uid;

   // this.mypicref = firebase.storage().ref('/')
  

  }

  ionViewDidLoad() {
    
    this.gduid();
    this.nget();

  }

/*takepic(){

  Camera.getPicture({
    quality:100,
    destinationType:Camera.DestinationType.DATA_URL,
    sourceType:Camera.PictureSourceType.CAMERA,
    encodingType:Camera.EncodingType.PNG,
    saveToPhotoAlbum:true
  }).then(imagedata =>{
      this.picdata = imagedata;
      this.upload()
  })

}

upload(){

  this.fire.authState.take(1).subscribe(data =>{
    this.mypicref.child(data.uid).child('pic.png')
    .putString(this.picdata,'base64',{contentType:'image/png'})
    .then(savepic =>{
      this.picurl=savepic.downloadURL
    })
  })
} */

getDataFromFirebase(){

  this.fire.authState.take(1).subscribe(auth =>{

    this.duid = auth.uid;
    console.log(this.duid);
    
  })

}

gduid(){

   var url = "http://192.168.1.214.xip.io:8000/ddetails/"+this.docuid.value;
   console.log(url);
   this.data = this.http.get(url);
   this.data.subscribe(data =>{
     this.result = data;
     console.log(this.result);
   })


}

patientlist(){

  //console.log(this.docuid.value);

 this.test = {duid: this.docuid.value};
  this.docf = this.test;
  //console.log(this.docf);
 
  var url = "http://192.168.1.214.xip.io:8000/plist";
this.data = this.http.post(url,this.docf);
this.data.subscribe(data =>{
  //console.log(this.docf);
 this.plist = data;
  console.log(data);
})
 
 
 
 }

 pdetails(puid,dfname,dlname,dloc){

  console.log(puid,dfname,dlname,dloc);

  this.navCtrl.push(PdetailsPage, {
    puid: puid , dfname: dfname, dlname: dlname, dloc: dloc
});

 }

 nget(){

  var url = "http://192.168.1.214.xip.io:8000/nget";
  var url2 = "http://192.168.1.214.xip.io:8000/mget";
console.log(url);
console.log(url2);
this.data = this.http.get(url);
this.data1 = this.http.get(url2);

this.data1.subscribe(data =>{
  this.mnotif = data;
this.data.subscribe(data =>{
  this.notif = data;
  console.log(this.notif);
  console.log(this.mnotif);

  for(var k = 0; k < this.mnotif.length ; k++) {
  for(var i = 0; i < this.notif.length; i++) {
    if(this.notif[i].nduid == this.docuid.value && this.notif[i].npuid == this.mnotif[k].epuid && this.notif[i].nduid == this.mnotif[k].eduid){

     console.log("check"+i+k);

     this.nduid = this.notif[i].nduid;
     this.npuid = this.notif[i].npuid;
     console.log(this.nduid);
     console.log(this.npuid);
     console.log(this.nduid,this.npuid);
    this.ndelete(this.nduid,this.npuid);

     let alert = this.alertCtrl.create({
      title: 'New Patient!',
      subTitle: 'You have a new Patient!',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked');

          }
        }
      ]
    });
    alert.present();
  
       }else {
       console.log("wrong"+i+k);

    } 
 }
}



})

})

/*
this.test = {duid: this.docuid.value};
this.docf = this.test;
//console.log(this.docf);
var url1 = "http://127.0.0.1:8000/nget";
var url = "http://127.0.0.1:8000/plist";
this.data1 = this.http.get(url);
this.data = this.http.post(url,this.docf);

this.data1.subscribe(data =>{
  this.notif = data;
this.data.subscribe(data =>{
//console.log(this.docf);
this.plist = data;
console.log(this.notif);
console.log(this.plist);

})
})*/

 }

 ndelete(duid,puid){


var url = "http://192.168.1.214.xip.io:8000/ndelete"; 
console.log(this.enrolls);
/* this.test = {duid: duid ,puid: puid };
this.docf = this.test;
console.log(this.docf); */

this.enrolls.duid = duid;
this.enrolls.puid = puid;
 
this.data = this.http.post(url,this.enrolls);
this.data.subscribe(data =>{
console.log(this.enrolls);
console.log(data);
})

 }

 con(puid,dfname,dlname){

  console.log(puid,dfname,dlname);
  //this.navCtrl.push(DconsultationPage);
  this.navCtrl.push(DconsultationPage, {
    puid: puid, duid: this.docuid.value , dfname: dfname , dlname: dlname
});
  

 }


logout(){

  //this.navCtrl.setRoot(HomePage)

  this.app.getRootNav().setRoot(HomePage);

}


  private newMethod() {
    return this;
  }
}
