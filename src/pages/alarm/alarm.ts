import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Title } from '@angular/platform-browser';

/**
 * Generated class for the AlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html',
})
export class AlarmPage {

  data = { title:'', description:'', date:'', time:'' };

  constructor(public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController) {}

  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    // var sound = this.platform.is('android')? "file://www/assets/sounds/Beep.mp3" : "file://www/assets/sounds/Beep.wav";
    console.log(date);
    this.localNotifications.requestPermission().then((permission) => {
      this.localNotifications.schedule({
        title: 'Take your Pill',
        text: 'medicine',
        trigger: {at: date },
        led: 'FF0000',
        sound: this.setSound(),
        vibrate: true
     });


      let alert = this.alertCtrl.create({
        title: 'You have added a Pill Reminder!',
        subTitle: 'Set Date: '+date,
        buttons: ['OK']
      });

      alert.present();
      this.data = { title:'', description:'', date:'', time:'' };
    });
  }

  
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Beep.mp3'
    } else {
      return 'file://assets/sounds/Beep.caf'
    }
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AlarmPage');
  // }

}
