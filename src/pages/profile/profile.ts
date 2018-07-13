import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { HomepagePage } from '../homepage/homepage';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DtabsPage } from '../dtabs/dtabs';
import { LoginPage } from '../login/login';

import { ElementRef } from '@angular/core';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  alertCtrl: any;
  duid;
  data: Observable<any>;
  profile = {} as Profile;

  latitude: number = 0;
  longitude: number = 0;

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private base:AngularFireDatabase, public http: HttpClient) {
  
    this.fire.authState.take(1).subscribe(auth =>{

      this.duid = auth.uid;
      console.log(this.duid);
    })

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }

  alert(message: string){

    this.alertCtrl.create({
        title: 'Info!',
        subTitle: message,
        buttons: ['OK']

    }).present();

  }

  onLocateUser(){

    console.log(this.profile.loc);

  let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.profile.loc }, (results,status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);

      this.profile.long = this.longitude;
      this.profile.lat = this.latitude;
      this.cprofile2();

    })

  }


  cprofile(){

   /* this.fire.authState.take(1).subscribe(auth =>{

      this.base.object(`doctor/${auth.uid}`).set(this.profile)
      .then(() => this.navCtrl.setRoot(HomepagePage))

    })*/

    this.onLocateUser();

  }

  cprofile2(){

    var url = "http://192.168.1.214.xip.io:8000/dinsert";
   
    this.data = this.http.post(url,this.profile);
    this.data.subscribe(data =>{
      console.log(data);
    }) 

    console.log(this.profile);
    this.navCtrl.setRoot(LoginPage);

  }

}
