import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MedicinePage } from '../medicine/medicine';


@IonicPage()
@Component({
  selector: 'page-medfrequency',
  templateUrl: 'medfrequency.html',
})
export class MedfrequencyPage {

  public form: FormGroup;
  private selectedLink: string;   

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.required],
      technologies: this._FB.array([
         this.initTechnologyFields()
      ])
   });
  }

  initTechnologyFields() : FormGroup
{
     return this._FB.group({
        name: ['', Validators.required]
     });
  }

  addNewInputField() : void {
      const control = <FormArray>this.form.controls.technologies;
      control.push(this.initTechnologyFields());
   }

  removeInputField(i : number) : void {
      const control = <FormArray>this.form.controls.technologies;
      control.removeAt(i);
   }

  manage(val : any) : void {
      console.dir(val);
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedfrequencyPage');
  }

  setradio(e: string): void {  
    this.selectedLink = e;  
  }  
  
  isSelected(name: string): boolean {  
    if (!this.selectedLink) {
      return false;  
    } 
    else{
      return (this.selectedLink === name);  
    }
  } 

  openMedicine(){
    this.navCtrl.setRoot(MedicinePage);
  }

  
}
