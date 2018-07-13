import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhomepagePage } from '../phomepage/phomepage';
import { PmapsPage } from '../pmaps/pmaps';
import { CdisplayPage } from '../cdisplay/cdisplay';
import { CalendarPage } from '../calendar/calendar';
import { CapturePage } from '../capture/capture';

/**
 * Generated class for the PtabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ptabs',
  templateUrl: 'ptabs.html',
})
export class PtabsPage {

  tab1 = PhomepagePage;
  tab2 = PmapsPage;
  tab3 = CapturePage;
  tab4 = CdisplayPage;
  tab5 = CalendarPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PtabsPage');
  }

}
