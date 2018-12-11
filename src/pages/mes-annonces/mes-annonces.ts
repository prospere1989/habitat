import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Loading } from 'ionic-angular';
import * as firebase from 'firebase';
import { PublierAnnoncePage } from '../publier-annonce/publier-annonce';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';
@IonicPage()
@Component({
  selector: 'page-mes-annonces',
  templateUrl: 'mes-annonces.html',
})
export class MesAnnoncesPage {
  mesannonces: any[];
  private listeFavoriskey:any[]
  private load:Loading;
  cs: any[] = ["Chambres", "Studios"];
  constructor(public loading: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.mesannonces = new Array();
    this.listeFavoriskey = new Array();
    this.liste();
    this.favoris();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesAnnoncesPage');
  }

  async liste() {
    this.load = this.loading.create({
      content: "Chargement des annonces"
    })
    
    this.load.present().then(data => {
      const key = firebase.auth().currentUser.uid;
       firebase.database().ref('users').child(key).child('logements')
        .on('child_added', snap => {
          let annonce = snap.val();
          annonce.key = snap.key
          this.mesannonces.push(annonce)
        })
        
    })
    this.load.dismiss();
  }
  
  publier(){
    this.navCtrl.push(PublierAnnoncePage)
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

}
