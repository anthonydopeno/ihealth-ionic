import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { AlarmPage } from '../alarm/alarm';


@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  

  calendar = {

      mode: 'month',
      currentDate: this.selectedDay

  }

  
  constructor(public navCtrl: NavController,private modalCtrl: ModalController, private alertCtrl: AlertController) {

  }

  addEvent(){

    let modal = this.modalCtrl.create('CalendarformPage', {selectedDay:this.selectedDay});
    modal.present();

    modal.onDidDismiss(data =>{
      if(data) {
        let eventData= data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });

  }

  onViewTitleChanged(title) {
     this.viewTitle = title;
  }

  onTimeSelected(ev) {

    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event){

    let start = moment(event.startTime).format('HH:mm');
    let end = moment(event.startTime).format('HH:mm');
    // let comment = moment(event.comment);
    let alert = this.alertCtrl.create({
    
      // title: '' + event.title,
      subTitle: 'Start: ' + start + '<br>End:' + end ,
      buttons: ['OK']
    });
    
    alert.present();
  }

  alarm(){

    this.navCtrl.push(AlarmPage);

  }

}
