import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Consultation } from '../../models/consultation';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the CdisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cdisplay',
  templateUrl: 'cdisplay.html',
})
export class CdisplayPage {

  puid;
  consultation = {} as Consultation;
  data: Observable<any>;
  result: Observable<any>;

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CdisplayPage');
    this.cget();
  }

  cget(){

    this.fire.authState.take(1).subscribe(auth =>{

      this.puid = auth.uid;
      console.log(this.puid);

      this.consultation.puid = this.puid;

      var url = "http://192.168.1.214.xip.io:8000/cget";
      this.data = this.http.post(url,this.consultation);
      this.data.subscribe(data =>{
        //console.log(this.docf);
       this.result = data;
       console.log(data);
  
      })
      
    })

    //this.puid = this.navParams.get('puid');

    //console.log(this.puid);





  }

}
