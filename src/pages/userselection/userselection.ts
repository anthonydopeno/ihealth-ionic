import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { PprofilePage } from '../pprofile/pprofile';

import { FirebaseAuth } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-userselection',
  templateUrl: 'userselection.html'
})
export class UserselectionPage {

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public alertCtrl: AlertController) {

  }

doctor(){

this.navCtrl.push(ProfilePage);

}

patient(){

  this.navCtrl.push(PprofilePage);
  
  }

}
