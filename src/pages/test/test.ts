import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormGroup, FormBuilder,FormArray} from '@angular/forms'
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  private fGroup:FormGroup;

  constructor(public fbuilder:FormBuilder, 
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.fGroup=  this.fbuilder.group({
        nom:["",Validators.required],
        Telephones : this.fbuilder.array([
          this.initTelephones()
        ])
      })
  }

  save(){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  initTelephones(){
     return  this.fbuilder.group({
        telephone1:["",Validators.required],
        telephone2:["",Validators.required]
      })
  }

  telephones (){
    const control = <FormArray>this.fGroup.controls['telephones'];
    control.push(this.initTelephones());
  }
}
