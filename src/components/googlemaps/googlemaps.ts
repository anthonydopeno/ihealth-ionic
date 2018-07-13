import { Component, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsLatLng, GoogleMapsCircleOptions, GoogleMapsMapTypeId, GoogleMapsKmlOverlayOptions, GoogleMapsGroundOverlayOptions, GoogleMapsMarkerOptions } from 'ionic-native';

/**
 * Generated class for the GooglemapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'googlemaps',
  templateUrl: 'googlemaps.html'
})
export class GooglemapsComponent {

@ViewChild("map") mapElement;

  constructor() {

  }

  ngOnInit(){
    this.initMap();
  }

map;

  initMap(){

    let coords = new GoogleMapsLatLng(45,100);
    var mapOptions = {
      center: coords,
      zoom: 14,
      mapTypeId: GoogleMapsMapTypeId.ROADMAP
    };
    this.map = new GoogleMap(this.mapElement.nativeElement,mapOptions);
  }

}
