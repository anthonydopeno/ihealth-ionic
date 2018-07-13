import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavParams ,NavController, AlertController, List } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomepagePage } from '../homepage/homepage';
import { ProfilePage } from '../profile/profile';
import { PhomepagePage } from '../phomepage/phomepage';
import { AngularFireDatabase, listChanges, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PtabsPage } from '../ptabs/ptabs';
import { DtabsPage } from '../dtabs/dtabs';
import { HomePage } from '../home/home';
import { DmainPage } from '../dmain/dmain';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('rduid') rduid;

  createProfile;
  doctor;
  patient;
  user = [];

  data: Observable<any>;
  puid: string;
  result: any = [];

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public alertCtrl: AlertController, private base:AngularFireDatabase,public http: HttpClient) {
  
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');



  }

  alert(message: string){

    this.alertCtrl.create({
        title: 'Info!',
        subTitle: message,
        buttons: ['OK']

    }).present();

  }

  back(){
    this.navCtrl.setRoot(HomePage);
  }

  signIn(){

 /*  this.fire.auth.signInWithEmailAndPassword(this.email.value,this.password.value)
    .then(data => {

              firebase.database().ref('doctor/').once('value', (snapshot) => {
                if (snapshot.val() !== null) {

                    var tableNames = Object.keys(snapshot.val());
                    console.log(tableNames);
                    console.log(data.uid);

                    for(var i = 0; i < tableNames.length; i++) {
                      if(tableNames[i] == data.uid){
                        this.navCtrl.setRoot(HomepagePage);
                        break;
                         }else {
                          this.navCtrl.setRoot(PhomepagePage);
                      } 
                   } 
          
              }
            }); 

      console.log('Got some data',data);
      this.alert('Success Login');

    })

    .catch(error => {

      console.log('Got some errors',error);
      this.alert(error.message);

    }) */
    //console.log(this.email.value);

    this.fire.auth.signInWithEmailAndPassword(this.email.value,this.password.value)
    .then(data1 => {

    var url = "http://192.168.1.214.xip.io:8000/clogin";
    console.log(url);
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      this.result = data;
      console.log(this.result);
      console.log(data1.uid);

      for(var i = 0; i < this.result.length; i++) {
        if(this.result[i].duid == data1.uid){
         this.navCtrl.setRoot(DmainPage);
         console.log("doctor");
          break;
           }else {
           this.navCtrl.setRoot(MainPage);
           console.log("patient");
        } 
     } 

    })

/*
    if(this.rduid.value == data.uid){
      this.navCtrl.setRoot(HomepagePage);
    }else{
      this.navCtrl.setRoot(PhomepagePage);
    } */

  })
  
  }

}
