import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';
import * as firebase from 'firebase'
import { userModel } from '../../models/userModel';
import { ModifierProfilePage} from '../modifier-profile/modifier-profile'

@IonicPage()
@Component({
  selector: 'page-mon-profile',
  templateUrl: 'mon-profile.html',
})
export class MonProfilePage {
  private user: userModel;
  
  constructor(public toast:ToastController,public loading: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = new userModel();
    this.details_profile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonProfilePage');
  }

 async details_profile() {
   let loading= this.loading.create({
      content: "Charegement des donnes",
      dismissOnPageChange:true
    })
    loading.present().then(
      () => {
        firebase.database().ref('users').child(firebase.auth().currentUser.uid).on('value', snap => {
          const user2 = snap.val();
          this.user.nom = user2.nom;
          this.user.prenom = user2.prenom;
          this.user.email = user2.email;
          this.user.profile = user2.profile;
          this.user.telephone = user2.telephone;

        });
        loading.dismiss()
      }

    )

  }

  modifier(){
    this.navCtrl.push(ModifierProfilePage)
  }
  
}
