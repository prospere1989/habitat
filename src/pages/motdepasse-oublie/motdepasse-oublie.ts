import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import {userModel} from '../../models/userModel';
import {FormGroup,Validators,FormBuilder} from '@angular/forms'
@IonicPage()
@Component({
  selector: 'page-motdepasse-oublie',
  templateUrl: 'motdepasse-oublie.html',
})
export class MotdepasseOubliePage {
  private user : userModel;
   fGroup:FormGroup;
  constructor(public fbuilder: FormBuilder,public toast: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.user = new userModel();
    this.fGroup = this.fbuilder.group({
      "email":["",Validators.compose([Validators.required,Validators.email])]
    }) }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotdepasseOubliePage');
  }

  changer(){
    try{
      firebase.auth().sendPasswordResetEmail(this.user.email).then(
        data=>{
            this.toast.create({
              message : "Nous vous avons envoye un lien de changement de mot de passe par email",
              dismissOnPageChange:true,
              closeButtonText:"Okay",
              duration : 30000
            }).present()
        }
      )
    }catch(e){
      
      this.toast.create({
        message : e.message,
        dismissOnPageChange:true,
        closeButtonText:"Okay",
        duration : 30000
      }).present()
    }
    
  }
}
