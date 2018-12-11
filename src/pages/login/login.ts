import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { userModel } from '../../models/userModel'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as firebase from 'firebase'
import { HomePage } from '../home/home';
import { MotdepasseOubliePage } from '../motdepasse-oublie/motdepasse-oublie'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: userModel;
  fGroup: FormGroup;
  constructor(public load: LoadingController, public toast: ToastController, public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.user = new userModel();
    this.fGroup = this.builder.group(
      {
        "email": ["", Validators.compose([Validators.email, Validators.required])],
        "motdepasse": ["", Validators.compose([Validators.minLength(5), Validators.required])]
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader=this.load.create({
      content : "Connexion encours",
      showBackdrop :true,
      dismissOnPageChange :true,

    })
    try {
      loader.present();
      firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.motdepasse)
        .then(user => {
          if (user) {
            this.navCtrl.setRoot(HomePage)
            
          }
        })

    } catch (e) {
      
      this.toast.create({
        message: e.message,
        duration: 30000,
        closeButtonText: "Okay",
        showCloseButton: true,
        dismissOnPageChange: true
      }).present()
      loader.dismiss()
    }

  }

  forgot() {
    this.navCtrl.push(MotdepasseOubliePage)
  }

}
