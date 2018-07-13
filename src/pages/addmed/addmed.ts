import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EditPage } from '../edit/edit';
import { HomePage } from '../home/home';

//import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { medicine } from '../../models/medinfo';
import { InventoryPage } from '../inventory/inventory';
import { PprofilePage } from '../pprofile/pprofile';
import { PhomepagePage } from '../phomepage/phomepage';
import { MainPage } from '../main/main';


/**
 * Generated class for the AddmedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addmed',
  templateUrl: 'addmed.html',
})
export class AddmedPage {

  theunit;
  result: any = [];
  insert;
  data: Observable<any>;
  medinfo = {} as medicine;
  public newSubcategories: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    public http: HttpClient 
  ){
    this.display();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmedPage');
    this.display();
  }
  
 ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  Addmed(){
    this.navCtrl.push(InventoryPage);
  }

  display(){
    var url = "http://192.168.1.214.xip.io:8000/display";

    this.data = this.http.get(url);
    this.data.subscribe(data =>{
    this.result = data;
    console.log(this.result);
    })   
  }

  edit(id){
    console.log(id);
    this.navCtrl.push(EditPage,{
      id: id
    });
  }

  delete(id){
    var url = "http://192.168.1.214.xip.io:8000/medicine/"+id+"/delete";

    console.log(url);
    this.data = this.http.get(url);

    this.data.subscribe(data =>{
      this.result = data;
      console.log(data);
    })

    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  back(){

    this.navCtrl.setRoot(MainPage);

  }
  

}
