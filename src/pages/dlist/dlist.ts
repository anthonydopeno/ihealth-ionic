import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

import { Member } from '../../models/member';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Enroll } from '../../models/enroll';
import { DlocatePage } from '../dlocate/dlocate';
import { CdisplayPage } from '../cdisplay/cdisplay';
import { AddmedPage } from '../addmed/addmed';

/**
 * Generated class for the PhomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-dlist',
  templateUrl: 'dlist.html',
})
export class DlistPage {


  @ViewChild('patuid') patuid;

  patient;
  docf = [];
  docl = [];
  dlist: any = [];
  dlists: any = [];
  pdet: any = [];
  get: any =[];
  test: any =[];
  email: string;

  fdlist: any = [];

  loc;

  data: Observable<any>;
  data1: Observable<any>;
  puid: string;
  result: any = [];

  member = {} as Member;
  enrolls = {} as Enroll;

  latitude: number = 0;
  longitude: number = 0;

  answer: any;
  sort: any = [];
  sorting: any = [];

  disabled = true;

  constructor(private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private base:AngularFireDatabase,public http: HttpClient,public app: App,public alertCtrl: AlertController) {

    this.email = fire.auth.currentUser.email;
    this.getDataFromFirebase();

  }

  ionViewDidLoad() {

   this.gpuid(); 
   this.doctorlist();
   this.run();
   //this.sorted();
  /*  this.navCtrl.push(CdisplayPage, {
      puid: this.patuid.value
  });*/

  

  }

  run(){

   var set = setInterval(function(){ 
      // call your service method here
      //isLoggedIn(); in your case
      (<HTMLInputElement> document.getElementById("run")).click();
      clearInterval(set);

   }, 3000);
    //$interval.cancel(myInterval);

    

  }

  getDataFromFirebase(){

    this.fire.authState.take(1).subscribe(auth =>{

      this.puid = auth.uid;
      console.log(this.puid);

      // this is also for testing because of this!
      //this.doctorlist(this.puid);
      
    })

}

gpuid(){

  var url = "http://192.168.1.214.xip.io:8000/pdetails/"+this.patuid.value;
  console.log(url);
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.result = data;
    console.log(this.result);
    this.locate(this.result.loc);
  
  })


}

locate(loc){

  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': loc }, (results,status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    //this.doctorlist(null,this.latitude,this.longitude);
    console.log("lat: " + this.latitude + ", long: " + this.longitude);
  })

}

sorted(){

  this.doctorlist();

  var url = "http://192.168.1.214.xip.io:8000/sget";
  console.log(url);
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.sorting = data;
    console.log(this.sorting);
    this.sdel();
  })

}

doctorlist(){

  console.log(this.latitude);
  console.log(this.longitude);

 /*firebase.database().ref('doctor/').once('value', (snapshot) => {
    if (snapshot.val() !== null) {

        var tableNames = Object.keys(snapshot.val());
        console.log(tableNames);

        this.fire.authState.take(1).subscribe(data =>{
       

          for(var i = 0; i < tableNames.length; i++) {   
          this.base.list(`doctor/${tableNames[i]}`).valueChanges().subscribe(
           data => {

            console.log(data[0],data[1])
             // this.docf.push(data[0])
             // this.docl.push(data[1])
              this.docf.push({fname: data[0],lname: data[1]});
              //console.log(this.doctorl)
            
             }
         )
        }
        

       
        
         })

  }
}); */

// ORIGINAL Commented for testing
/*var url = "http://127.0.0.1:8000/dlist";
console.log(url);
this.data = this.http.get(url);
this.data.subscribe(data =>{
  this.dlist = data;
  console.log(this.dlist);
})*/

//------------testing----------------

//

/*var url = "http://127.0.0.1:8000/dlist";
console.log(url);
this.data = this.http.get(url);
this.data.subscribe(data =>{
  this.dlist = data;
  console.log(this.dlist);
})*/

  var url = "http://192.168.1.214.xip.io:8000/pdetails/"+this.patuid.value;
console.log(url);
this.data = this.http.get(url);
this.data.subscribe(data =>{
  this.pdet = data;
  console.log(this.pdet.chronic);


    if(this.pdet.chronic == "Diabetes"){

      this.test = {sp1: "Endocrinologist"};
      this.docf = this.test;


var url = "http://192.168.1.214.xip.io:8000/dlist";
this.data = this.http.post(url,this.docf);
this.data.subscribe(data =>{

  this.dlist = data;
  console.log(data);

  //for location
  for(var x=0 ; x<this.dlist.length ; x++) {
    this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));

    console.log(x); 
    console.log(this.longitude);
    console.log(this.dlist[x].long);
    console.log(this.answer);

    this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
    var url = "http://192.168.1.214.xip.io:8000/sort";

    this.data = this.http.post(url,this.sort);
    this.data.subscribe(data =>{
      console.log(data)
    }) 

    }

})

//this.sorted();

       }

    if(this.pdet.chronic == "Lou Gehriq's Disease") {
       
      this.test = {sp1: "Physical Therapist"};
      this.docf = this.test;

var url = "http://192.168.1.214.xip.io:8000/dlist";
this.data = this.http.post(url,this.docf);
this.data.subscribe(data =>{

  this.dlist = data;
  console.log(data);

  //for location
  for(var x=0 ; x<this.dlist.length ; x++) {
    this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));

    console.log(x); 
    console.log(this.longitude);
    console.log(this.dlist[x].long);
    console.log(this.answer);

    this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
    var url = "http://192.168.1.214.xip.io:8000/sort";

    this.data = this.http.post(url,this.sort);
    this.data.subscribe(data =>{
      console.log(data)
    }) 

    }

})

//this.sorted();

      } 

      if(this.pdet.chronic == "Alzheimer's Disease") {
       
        this.test = {sp1: "Physician/Medical Doctor" , sp2: "Neurologists" , sp3: "Psychiatrists" , sp4: "Psychologist"};
        this.docf = this.test;
  
  
  var url = "http://192.168.1.214.xip.io:8000/dlist";
  this.data = this.http.post(url,this.docf);
  this.data.subscribe(data =>{
  
    this.dlist = data;
    console.log(data);

    //for location
    for(var x=0 ; x<this.dlist.length ; x++) {
      this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));

      console.log(x); 
      console.log(this.longitude);
      console.log(this.dlist[x].long);
      console.log(this.answer);

      this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
      var url = "http://192.168.1.214.xip.io:8000/sort";

      this.data = this.http.post(url,this.sort);
      this.data.subscribe(data =>{
        console.log(data)
      }) 

      }

  })

  //this.sorted();
  
        } 
              
     if(this.pdet.chronic == "Arthritis") {

      //this.sdel();
       
                this.test = {sp1: "Rheumatologists" , sp2: "Orthopedic Surgeons" , sp3: "Physiatrist"  };
                this.docf = this.test;
          
          
          var url = "http://192.168.1.214.xip.io:8000/dlist";
          this.data = this.http.post(url,this.docf);
          this.data.subscribe(data =>{
          
            this.dlist = data;
            console.log(data);
//for location
            for(var x=0 ; x<this.dlist.length ; x++) {
            this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
  
            console.log(x); 
            console.log(this.longitude);
            console.log(this.dlist[x].long);
            console.log(this.answer);

            this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
            var url = "http://192.168.1.214.xip.io:8000/sort";
   
            this.data = this.http.post(url,this.sort);
            this.data.subscribe(data =>{
              console.log(data);
            }) 

         /*   if(x==this.dlist.length-1){

              console.log("Entered")
              this.sorted();

            } */
            
            }



          })

          //this.sorted();
          
                }
              
                    if(this.pdet.chronic == "Asthma") {
       
                      this.test = {sp1: "Allergist/Immunologist" , sp2: "Pulmonologist" };
                      this.docf = this.test;
                
                
                var url = "http://192.168.1.214.xip.io:8000/dlist";
                this.data = this.http.post(url,this.docf);
                this.data.subscribe(data =>{
                
                  this.dlist = data;
                  console.log(data);

                  //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                })

                //this.sorted();
                
                      }
          

              if(this.pdet.chronic == "Cancer") {
       
                          this.test = {sp1: "Surgical Oncologist" , sp2: "Medical Oncologist" ,sp3: "Radiation Oncologist" };
                          this.docf = this.test;
                    
                    
                    var url = "http://192.168.1.214.xip.io:8000/dlist";
                    this.data = this.http.post(url,this.docf);
                    this.data.subscribe(data =>{
                    
                      this.dlist = data;
                      console.log(data);

                      //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }
                      
                    })

                   // this.sorted();
                    
                          }

                          if(this.pdet.chronic == "Chronic Obstructive Pulmonary Disease" || this.pdet.chronic == "Cystic Fibrosis") {
       
                            this.test = {sp1: "Pulmonologist"};
                            this.docf = this.test;
                      
                      
                      var url = "http://192.168.1.214.xip.io:8000/dlist";
                      this.data = this.http.post(url,this.docf);
                      this.data.subscribe(data =>{
                      
                        this.dlist = data;
                        console.log(data);

                        //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                      })

                   //   this.sorted();
                      
                            }


                              if(this.pdet.chronic == "Heart Disease") {
       
                                this.test = {sp1: "Cardiologist"};
                                this.docf = this.test;
                          
                          
                          var url = "http://192.168.1.214.xip.io:8000/dlist";
                          this.data = this.http.post(url,this.docf);
                          this.data.subscribe(data =>{
                          
                            this.dlist = data;
                            console.log(data);

                            //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                          })

                        //  this.sorted();
                          
                                }

                                if(this.pdet.chronic == "Obesity") {
       
                                  this.test = {sp1: "Bariatricians"};
                                  this.docf = this.test;
                            
                            
                            var url = "http://192.168.1.214.xip.io:8000/dlist";
                            this.data = this.http.post(url,this.docf);
                            this.data.subscribe(data =>{
                            
                              this.dlist = data;
                              console.log(data);

                              //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                            })

                          //  this.sorted();
                            
                                  }

                                  if(this.pdet.chronic == "Oral Health") {
       
                                    this.test = {sp1: "Pediatric Dentist" , sp2: "Endodontist"};
                                    this.docf = this.test;
                              
                              
                              var url = "http://192.168.1.214.xip.io:8000/dlist";
                              this.data = this.http.post(url,this.docf);
                              this.data.subscribe(data =>{
                              
                                this.dlist = data;
                                console.log(data);

                                //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                              })

                            //  this.sorted();
                              
                                    }

                                    if(this.pdet.chronic == "Eating Disorder") {
       
                                      this.test = {sp1: "Psychiatrists" , sp2: "Physician/Medical Doctor"};
                                      this.docf = this.test;
                                
                                
                                var url = "http://192.168.1.214.xip.io:8000/dlist";
                                this.data = this.http.post(url,this.docf);
                                this.data.subscribe(data =>{
                                
                                  this.dlist = data;
                                  console.log(data);

                                  //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                                })

                              //  this.sorted();
                                
                                      }

                                      if(this.pdet.chronic == "Osteoporosis") {
       
                                        this.test = {sp1: "Endocrinologist" , sp2: "Rheumatologists" , sp3: "Physiatrist"};
                                        this.docf = this.test;
                                  
                                  
                                  var url = "http://192.168.1.214.xip.io:8000/dlist";
                                  this.data = this.http.post(url,this.docf);
                                  this.data.subscribe(data =>{
                                  
                                    this.dlist = data;
                                    console.log(data);

                                    //for location
            for(var x=0 ; x<this.dlist.length ; x++) {
              this.answer = Math.sqrt(Math.pow( Math.abs(this.longitude - this.dlist[x].long),2) + Math.pow(Math.abs(this.latitude - this.dlist[x].lat),2));
    
              console.log(x); 
              console.log(this.longitude);
              console.log(this.dlist[x].long);
              console.log(this.answer);
  
              this.sort = {duid: this.dlist[x].duid , fname: this.dlist[x].fname , lname: this.dlist[x].lname , sp: this.dlist[x].sp , loc: this.answer };
              var url = "http://192.168.1.214.xip.io:8000/sort";
     
              this.data = this.http.post(url,this.sort);
              this.data.subscribe(data =>{
                console.log(data)
              }) 
  
              }

                                  })
                                  
                               //   this.sorted();

                                        }

                                     // this.jokes();

   /* else {

      this.test = {sp: "Physician/Medical Doctor"};
      this.docf = this.test;
//console.log(this.docf);

var url = "http://127.0.0.1:8000/dlist";
this.data = this.http.post(url,this.docf);
this.data.subscribe(data =>{
//console.log(this.docf);
  this.dlist = data;
  console.log(data);
})
    }*/

})



}

enroll(dlist,i){

  console.log(dlist);

var url = "http://192.168.1.214.xip.io:8000/d/"+dlist;
this.data = this.http.get(url);
this.data.subscribe(data =>{

this.dlists = data;
console.log(data);

this.enroll2(dlist,this.patuid.value,i);

})

}

enroll2(duid,puid,i){

  var url = "http://192.168.1.214.xip.io:8000/enroll";
  console.log(this.enrolls);

  this.enrolls.duid = duid;
  this.enrolls.puid = puid;
   
this.data = this.http.post(url,this.enrolls);
this.data.subscribe(data =>{
  console.log(this.enrolls);
  console.log(data);

  let alert = this.alertCtrl.create({
    title: 'Enrolment Successful',
    subTitle: 'You are now enrolled!',
    buttons: [
      {
        text: 'OK',
        handler: data => {
          console.log('OK clicked');
          this.enbtn(duid,puid,i);

        }
      }
    ]
  });
  alert.present();

})

var url2 = "http://192.168.1.214.xip.io:8000/notification";
this.data = this.http.post(url2,this.enrolls);
this.data.subscribe(data =>{
  console.log(this.enrolls);
  console.log(data);
})

// -------------------------------

}



enbtn(duid,puid,k){

  console.log("im inside")
  console.log(duid)
  console.log(puid)
  console.log(k)

  var url = "http://192.168.1.214.xip.io:8000/dmembers";
  console.log(url);
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.result = data;
    console.log(data);

    for(var i = 0; i < this.result.length ; i++) {
  
    if (this.result[i].eduid == duid && this.result[i].epuid == puid){
  
      //document.getElementById("Button"+k).disabled = true;
      //this.disabled=true;

      (<HTMLInputElement> document.getElementById(k)).disabled = true;
      (<HTMLInputElement> document.getElementById("un"+k)).disabled = false;
    
    }
  
  }

  })

}



unenroll(dlist,k){

  console.log(dlist);

  (<HTMLInputElement> document.getElementById(k)).disabled = false;
  (<HTMLInputElement> document.getElementById("un"+k)).disabled = true;

  //this.disabled=false;

 /* var url = "http://127.0.0.1:8000/dlist";
console.log(url);
this.data = this.http.get(url);
this.data.subscribe(data =>{
  this.dlist = data;
  console.log(this.dlist[dlist].duid);
  this.unenroll2(this.dlist[dlist].duid,this.patuid.value);

})*/

var url = "http://192.168.1.214.xip.io:8000/d/"+dlist;
this.data = this.http.get(url);
this.data.subscribe(data =>{

this.dlists = data;
console.log(data);

this.unenroll2(dlist,this.patuid.value);

})

}

unenroll2(duid,puid){

  var url = "http://192.168.1.214.xip.io:8000/delete";
  console.log(this.enrolls);
 /* this.test = {duid: duid ,puid: puid };
  this.docf = this.test;
  console.log(this.docf); */

  this.enrolls.duid = duid;
  this.enrolls.puid = puid;
   
this.data = this.http.post(url,this.enrolls);
this.data.subscribe(data =>{
  console.log(this.enrolls);
  console.log(data);
})

}

gdirections(i){

  console.log(i);
/*
  var url = "http://127.0.0.1:8000/dlist";
console.log(url);
this.data = this.http.get(url);
this.data.subscribe(data =>{
  this.dlist = data;
  this.loc = this.dlist[i].loc;
  console.log(this.loc);

  this.navCtrl.push(DlocatePage, {
    loc: this.loc
});
  //console.log(this.dlist);
}) */

  //this.navCtrl.push(DlocatePage);

var url = "http://192.168.1.214.xip.io:8000/d/"+i;
this.data = this.http.get(url);
this.data.subscribe(data =>{

this.dlists = data;
console.log(data);

this.navCtrl.push(DlocatePage, {
  loc: this.dlists.loc
});

})

}

sdel(){

  var url = "http://192.168.1.214.118.xip.io:8000/sdel";
  console.log(url);
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    console.log("Deleted");
  })

}

/*inventory(){

  this.navCtrl.push(AddmedPage)

}*/

/*logout(){

 // this.navCtrl.setRoot(HomePage)
 var url = "http://192.168.1.12.xip.io:8000/sdel";
 console.log(url);
 this.data = this.http.get(url);
 this.data.subscribe(data =>{
   this.app.getRootNav().setRoot(HomePage);
 })



}*/

}
