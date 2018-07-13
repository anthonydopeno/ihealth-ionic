import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomepagePage } from '../homepage/homepage';
import { DmapsPage } from '../dmaps/dmaps';
import { PlistPage } from '../plist/plist';

/**
 * Generated class for the DmainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dmain',
  templateUrl: 'dmain.html',
})
export class DmainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DmainPage');
  }

 // tab1 = HomepagePage;
  //tab2 = DmapsPage;

  profile(){
    this.navCtrl.push(HomepagePage);
  }
  
  map(){
    this.navCtrl.push(DmapsPage);
  }

  plist(){
    this.navCtrl.push(PlistPage);
  }


}
