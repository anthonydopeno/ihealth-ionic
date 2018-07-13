import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomepagePage } from '../homepage/homepage';
import { Pprofile } from '../../models/pprofile';
import { PhomepagePage } from '../phomepage/phomepage';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PtabsPage } from '../ptabs/ptabs';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pprofile',
  templateUrl: 'pprofile.html',
 })
export class PprofilePage {

  alertCtrl: any;
  puid;
  data: Observable<any>;
  pprofile = {} as Pprofile;

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private base:AngularFireDatabase,public http: HttpClient) {
  
    this.fire.authState.take(1).subscribe(auth =>{

      this.puid = auth.uid;
      console.log(this.puid);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PprofilePage');
  }

  alert(message: string){

    this.alertCtrl.create({
        title: 'Info!',
        subTitle: message,
        buttons: ['OK']

    }).present();

  }


  cpprofile(){

  /*  this.fire.authState.take(1).subscribe(auth =>{

      this.base.object(`patient/${auth.uid}`).set(this.pprofile)
      .then(() => this.navCtrl.setRoot(PhomepagePage))

    }) */

    var url = "http://192.168.1.214.xip.io:8000/pinsert";
   
    this.data = this.http.post(url,this.pprofile);
    this.data.subscribe(data =>{
      console.log(data);
    }) 

    console.log(this.pprofile);
    this.navCtrl.setRoot(LoginPage);

  }

}