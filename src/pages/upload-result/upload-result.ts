import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  File, Entry } from 'ionic-native';
import { storage, initializeApp } from 'firebase' ;
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FIREBASE_CONFIG } from '../../app/firebase.config';
// import { firebaseAuth } from '../../app/app.module';


@IonicPage()
@Component({
  selector: 'page-upload-result',
  templateUrl: 'upload-result.html',
})
export class UploadResultPage {

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
   
  }

  //Functions

  async takePhoto(){

    try {
    const options: CameraOptions = {
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,${result}';
    const pictures = storage().ref('pictures/prescription');
    pictures.putString(image, 'data_url');

  }
    catch (e) {
      console.error(e);
  }
  }
  }
  
