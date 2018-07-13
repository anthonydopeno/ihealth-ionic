import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PrintPage } from '../print/print';

/**
 * Generated class for the PdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-pdetails',
  templateUrl: 'pdetails.html',
})
export class PdetailsPage {

  data: Observable<any>;
  result: any = [];
  puid;
  dfname;
  dlname;
  dloc;

  @ViewChild('map') mapRef: ElementRef;
  //map: any;

  latitude: number = 0;
  longitude: number = 0;
 // geo: any
 loc;

 lat: number;
 lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdetailsPage');
    this.gpuid();
    //this.onLocateUser();
  }

  gpuid(){

    this.puid = this.navParams.get('puid');

    var url = "http://192.168.1.214.xip.io:8000/pdetails/"+this.puid;
    console.log(url);
    this.data = this.http.get(url);
    this.data.subscribe(data =>{
      this.result = data;
      console.log(this.result);
      this.onLocateUser(this.result.loc);
    })
  
  
  }

  onLocateUser(loc){

    //this.loc = this.navParams.get('loc');
    console.log(loc);

  let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': loc }, (results,status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.showMap(this.latitude,this.longitude);
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
    })

  }

  showMap(lat,lng){

    // Location = lat long
    const location = new google.maps.LatLng(lat,lng);

    // Map Options
    const options = {
      center: location,
      zoom: 10
    }

    const map = new google.maps.Map(this.mapRef.nativeElement,options);

    this.addMarker(location, map);

  }

  addMarker(position,map){

    return new google.maps.Marker({
      position,
      map
    });

  }

  goToPrintPage(pfname,plname){

    this.dfname = this.navParams.get('dfname');
    this.dlname = this.navParams.get('dlname');
    this.dloc = this.navParams.get('dloc');

    console.log("This is for print");
    this.navCtrl.push(PrintPage, {
      dfname: this.dfname, dlname: this.dlname, dloc: this.dloc , pfname: pfname, plname: plname
    });

  }

}
