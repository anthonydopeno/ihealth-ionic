import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DmapsPage } from '../dmaps/dmaps';
import { HomepagePage } from '../homepage/homepage';

/**
 * Generated class for the DtabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dtabs',
  templateUrl: 'dtabs.html',
})
export class DtabsPage {

  tab1 = HomepagePage;
  tab2 = DmapsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DtabsPage');
  }

}
