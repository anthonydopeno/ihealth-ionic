import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { UserselectionPage } from '../userselection/userselection';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {


  @ViewChild('email') email;
  @ViewChild('password') password;

  constructor(private fire: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  register(){

    this.fire.auth.createUserWithEmailAndPassword(this.email.value,this.password.value)
    .then(data => {

      console.log('Got Data', data);
      this.alert('User Registered');
      //this.navCtrl.setRoot(HomePage);
      this.navCtrl.setRoot(UserselectionPage);


    })
    .catch(error => {

      console.log('Got Error', error);
      this.alert(error.message);

    });

console.log('Register', this.email.value, this.password.value);
  
  }

}
