import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import * as firebase from 'firebase'
import { userModel } from '../../models/userModel'
import { inscriptionValidator } from '../../validators/inscriptionValidator'
import { HomePage } from '../home/home';
import { MonProfilePage } from '../mon-profile/mon-profile';

@IonicPage()
@Component({
  selector: 'page-modifier-profile',
  templateUrl: 'modifier-profile.html',
})
export class ModifierProfilePage {

  private user: userModel;
  public load: Loading
  fGroup: FormGroup;
  constructor(public loading: LoadingController, public toast: ToastController, public fbuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.user = new userModel()
    this.fGroup = this.fbuilder.group({
      "nom": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "prenom": [""],
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "telephone": ["", Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      "profile": ["", Validators.compose([Validators.required])],
      /* "motdepasse": ["", Validators.compose([Validators.required, Validators.minLength(6)])],
       "motdepasse2": ["", Validators.compose([Validators.required, Validators.minLength(6), inscriptionValidator.motdepasse2])]*/
    })

    this.load = this.loading.create({
      content: "Modification encours",
      dismissOnPageChange: true,
      showBackdrop: true,
    });
    this.charger_user();
  }

  async charger_user() {
    await firebase.database().ref('users').child(firebase.auth().currentUser.uid).on('value', snap => {
      const user2 = snap.val()
      this.user.nom = user2.nom;
      this.user.prenom = user2.prenom;
      this.user.telephone = user2.telephone;
      this.user.email = user2.email;
      // this.user.motdepasse = user2.motdepasse;
      this.user.profile = user2.profile;
    })
  }

  async modifier() {
    this.load = this.loading.create({
      content: "Modification encours",
      dismissOnPageChange :true
    })
    this.load.present();
    firebase.auth().currentUser.updateEmail(this.user.email)
    // firebase.auth().currentUser.updatePassword(this.user.motdepasse)

    await firebase.database().ref('users').child(firebase.auth().currentUser.uid).set(this.user)
    this.toast.create({
      message :"Modification reussie",
      dismissOnPageChange : false,
      duration :3000
    }).present();
    this.navCtrl.popTo(MonProfilePage)
  }
}
