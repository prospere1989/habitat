import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { IonicPage, NavController, NavParams, ToastController, LoadingController,Loading } from 'ionic-angular';
import * as firebase from 'firebase'
import { userModel } from '../../models/userModel'
import { inscriptionValidator } from '../../validators/inscriptionValidator'
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  private user: userModel;
  public load:Loading
  fGroup: FormGroup;
  constructor(public loading: LoadingController,public toast: ToastController, public fbuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.user = new userModel()
    this.fGroup = this.fbuilder.group({
      "nom": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "prenom": [""],
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "telephone": ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      "profile": ["", Validators.compose([Validators.required])],
      "motdepasse": ["", Validators.compose([Validators.required, Validators.minLength(6)])],
      "motdepasse2": ["", Validators.compose([Validators.required, Validators.minLength(6), inscriptionValidator.motdepasse2])]
    })

    this.load = this.loading.create({
      content: "inscription encours",
      dismissOnPageChange: true,
      showBackdrop: true,
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  inscription() {

    try {
      this.load.present()
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.motdepasse).then(
        user => {
          
          firebase.database().ref('users/'+user.uid).set(this.user);
          this.navCtrl.setRoot(HomePage)
        }
      )

    } catch (e) {
      this.load.dismiss();
      this.toast.create({
        message: e.message,
        dismissOnPageChange: true,
        closeButtonText: "okay",
        showCloseButton: true
      }).present();
    }
  }

}
