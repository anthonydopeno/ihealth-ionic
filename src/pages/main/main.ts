import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PtabsPage } from '../ptabs/ptabs';
import { PhomepagePage } from '../phomepage/phomepage';
import { CalendarPage } from '../calendar/calendar';
import { CapturePage } from '../capture/capture';
import { PmapsPage } from '../pmaps/pmaps';
import { CdisplayPage } from '../cdisplay/cdisplay';
import { AddmedPage } from '../addmed/addmed';
import { DlistPage } from '../dlist/dlist';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  //tab1 = PhomepagePage;
  //tab2 = PmapsPage;
//  tab3 = CapturePage;
  //tab4 = CdisplayPage;
 // tab5 = CalendarPage;


  profile(){
    this.navCtrl.push(PhomepagePage);
  }

  pill(){
    this.navCtrl.push(CalendarPage);
  }

  mkit(){
    this.navCtrl.push(AddmedPage);
  }

  cam(){
    this.navCtrl.push(CapturePage);
  }
  
  map(){
    this.navCtrl.push(PmapsPage);
  }

  con(){
    this.navCtrl.push(CdisplayPage);
  }

  dlist(){
    this.navCtrl.push(DlistPage);
  }



}
