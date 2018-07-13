import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MeddurationPage } from '../medduration/medduration';
import { MedfrequencyPage } from '../medfrequency/medfrequency';
import { AddmedPage } from '../addmed/addmed';

/**
 * Generated class for the MedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {

  gname: string;
  bname: string;
  units: string;
  dosage: string;
  advice : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public appCtrl: App) {
    this.gname = navParams.get('data');
    this.bname = navParams.get('data2');
    this.units = navParams.get('data3');
    this.dosage = navParams.get('data4');
    this.advice = navParams.get('data5');
  }

  goBack(){
    this.navCtrl.push(HomePage);
  }

  goMedicine(){
    this.navCtrl.push(AddmedPage);
  }

  openDuration(){
    this.appCtrl.getRootNav().push(MeddurationPage);
    // this.navCtrl.push(MeddurationPage);
  }

  openFrequency(){
    this.navCtrl.push(MedfrequencyPage);
  }

}
