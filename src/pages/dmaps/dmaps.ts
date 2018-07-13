import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation, GoogleAnalytics, Geocoder } from 'ionic-native';
/**
 * Generated class for the DmapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-dmaps',
  templateUrl: 'dmaps.html',
})
export class DmapsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild('map') mapRef: ElementRef;
  //map: any;

  latitude: number = 0;
  longitude: number = 0;
 // geo: any
 loc = "Mandaue City";

 lat: number;
 lng: number;



  ionViewDidLoad() {
    console.log(this.mapRef);
    this.onLocateUser();
    //this.showMap();
    //this.initMap();
  }

  
  onLocateUser(){

    //console.log(Geocoder.geocode({ 'address':this.loc }));

  /*let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.loc }, (results,status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
    })*/

    Geolocation.getCurrentPosition().then(
      (location) => {
        console.log(location);
        console.log('Location Fetch Successfully');
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        console.log(this.lat,this.lng);
        this.showMap(this.lat,this.lng);
      }
    ).catch(
      (error) => console.log('An error occurred')
    );

  }

  /*geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }*/

  showMap(lat,lng){

   /* let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'loc':loc }, (results,status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
    }) */

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
