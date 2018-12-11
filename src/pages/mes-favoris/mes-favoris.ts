import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { PublierAnnoncePage } from '../publier-annonce/publier-annonce';
import { LoginPage } from '../login/login';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';
@IonicPage()
@Component({
  selector: 'page-mes-favoris',
  templateUrl: 'mes-favoris.html',
})
export class MesFavorisPage {
  private listeFavoris:any[]
  private listeFavoriskey:any[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.listeFavoris = new Array()
    this.listeFavoriskey = new Array()
    this.liste()
    this.favoris()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesFavorisPage');
  }

  liste(){
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/favoris`)
    .on('child_added',snap=>{
      const key = snap.key;
      let logement =snap.val()
      logement.key=key
      this.listeFavoris.push(logement)
    })
  }

  detail(param){
    this.navCtrl.push(DetailsAnnoncePage,{
      "annonce":param,
      "favoris":this.listeFavoriskey
    })
    console.log(param)
  }

 async  favoris(){
    const user=firebase.auth().currentUser;
   await firebase.database().ref(`users/${user.uid}/favoris`).on('child_added',snap=>{
      this.listeFavoriskey.push(snap.key)
    });
  }

  publier(){
    if(firebase.auth().currentUser){
      this.navCtrl.push(PublierAnnoncePage)
    }
    else {
      this.navCtrl.push(LoginPage)
    }
  }

}
