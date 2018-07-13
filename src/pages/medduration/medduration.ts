import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicinePage } from '../medicine/medicine';


/**
 * Generated class for the MeddurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medduration',
  templateUrl: 'medduration.html',
})
export class MeddurationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeddurationPage');
  }

  private selectedLink: string;        
  
  setradio(e: string): void {  
    this.selectedLink = e;  
  }  
  
  isSelected(name: string): boolean {  
    if (!this.selectedLink || this.selectedLink === 'none') {
      return false;  
    } 
    else{
      return (this.selectedLink === name);  
    }
  }
  openMedicine(){
    this.navCtrl.setRoot(MedicinePage);
  }
  
}
  