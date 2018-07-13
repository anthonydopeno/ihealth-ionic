import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation, GoogleAnalytics, Geocoder } from 'ionic-native';
import { Observable } from '@firebase/util';
//import { Injectable, Inject, OpaqueToken } from '@angular/core';
/**
 * Generated class for the PmapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@Injectable()

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-pmaps',
  templateUrl: 'pmaps.html',
})
export class PmapsPage {

  @ViewChild('map') mapRef: ElementRef;
  //map: any;

  latitude: number = 0;
  longitude: number = 0;
 // geo: any
 loc = "Mandaue City";

 lat: number;
 lng: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

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


  //=========================================

  //var map;
  //var infowindow;
/*
  initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};

   const map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    const infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: pyrmont,
      radius: 500,
      type: ['store']
    }, this.callback);
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: Map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      this.infowindow.setContent(place.name);
      this.infowindow.open(Map, this);
    });
  }

*/
}
