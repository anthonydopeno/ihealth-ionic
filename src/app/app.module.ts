import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomepagePage } from '../pages/homepage/homepage';
import { ProfilePage } from '../pages/profile/profile';
import { UserselectionPage } from '../pages/userselection/userselection';
import { PprofilePage } from '../pages/pprofile/pprofile';
import { PhomepagePage } from '../pages/phomepage/phomepage';

import { PmapsPage } from '../pages/pmaps/pmaps';
import { DmapsPage } from '../pages/dmaps/dmaps';
import { PtabsPage } from '../pages/ptabs/ptabs';
import { DtabsPage } from '../pages/dtabs/dtabs';

import { DlocatePage } from '../pages/dlocate/dlocate';
import { PdetailsPage } from '../pages/pdetails/pdetails';

import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { DconsultationPage } from '../pages/dconsultation/dconsultation';
import { CdisplayPage } from '../pages/cdisplay/cdisplay';

import { PrintPage } from '../pages/print/print';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Calendar } from 'ionic-native';
import { CalendarPage } from '../pages/calendar/calendar';
import { NgCalendarModule } from 'ionic2-calendar';
import { CapturePage } from '../pages/capture/capture';

import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AlarmPage } from '../pages/alarm/alarm';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { InventoryPage } from '../pages/inventory/inventory';
import { AddmedPage } from '../pages/addmed/addmed';
import { MedicinePage } from '../pages/medicine/medicine';
import { MeddurationPage } from '../pages/medduration/medduration';
import { MedfrequencyPage } from '../pages/medfrequency/medfrequency';
import { EditPage } from '../pages/edit/edit';
import { ServiceProvider } from '../providers/service/service';
import { MainPage } from '../pages/main/main';
import { DmainPage } from '../pages/dmain/dmain';
import { PlistPage } from '../pages/plist/plist';
import { DlistPage } from '../pages/dlist/dlist';



//import { GooglemapsComponent } from '../components/googlemaps/googlemaps'
//import { AgmCoreModule } from 'angular2-google-maps/core';
//import { OpaqueToken } from '@angular/core';

const firebaseAuth = {
  apiKey: "AIzaSyC6G7NUwAeitC-jKUDZrlhPiS8nWh1q9Eg",
  authDomain: "ihealth-35862.firebaseapp.com",
  databaseURL: "https://ihealth-35862.firebaseio.com",
  projectId: "ihealth-35862",
  storageBucket: "ihealth-35862.appspot.com",
  messagingSenderId: "181449947085"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    HomepagePage,
    ProfilePage,
    UserselectionPage,
    PprofilePage,
    PhomepagePage,
    PmapsPage,
    PtabsPage,
    DmapsPage,
    DtabsPage,
    DlocatePage,
    PdetailsPage,
    DconsultationPage,
    CdisplayPage,
    PrintPage,
    CalendarPage,
    CapturePage,
    AlarmPage,
    InventoryPage,
    AddmedPage,
    MedicinePage,
    MeddurationPage,
    MedfrequencyPage,
    EditPage,
    MainPage,
    DmainPage,
    PlistPage,
    DlistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    NgCalendarModule
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzJuIlOq-zE52MgkIBzhpBbE4QMTD6RIE'
    }) */
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    HomepagePage,
    ProfilePage,
    UserselectionPage,
    PprofilePage,
    PhomepagePage,
    PmapsPage,
    PtabsPage,
    DmapsPage,
    DtabsPage,
    DlocatePage,
    PdetailsPage,
    DconsultationPage,
    CdisplayPage,
    PrintPage,
    CalendarPage,
    CapturePage,
    AlarmPage,
    InventoryPage,
    AddmedPage,
    MedicinePage,
    MeddurationPage,
    MedfrequencyPage,
    EditPage,
    MainPage,
    DmainPage,
    PlistPage,
    DlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileOpener,
    Transfer,
    Camera,
    FilePath,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
