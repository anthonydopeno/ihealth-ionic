import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DlocatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-dlocate',
  templateUrl: 'dlocate.html',
})
export class DlocatePage {

  @ViewChild('map') mapRef: ElementRef;
  //map: any;

  latitude: number = 0;
  longitude: number = 0;
 // geo: any
 loc;

 lat: number;
 lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.mapRef);
    this.onLocateUser();
  }

  onLocateUser(){

    this.loc = this.navParams.get('loc');
    console.log(this.loc);

  let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.loc }, (results,status) => {
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

}
