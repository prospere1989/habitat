import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublierAnnoncePage } from '../publier-annonce/publier-annonce';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';
@IonicPage()
@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
})
export class ListePage {
  private vendre : string='Louer'
  private finishedlouer:boolean=false;
  private type:string;
  private avendre:any[]
  private alouer:any[]
  private lkv:string;
  private lkl:string;
  private favorisTab:any[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = this.navParams.get('type')
    this.favorisTab = new Array();
    this.avendre = new Array()
    this.alouer = new Array()
    this.lescinqPremiers();
    this.favoris();
    console.log(this.alouer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListePage');
  }

  publier(){
    if(firebase.auth().currentUser){
      this.navCtrl.push(PublierAnnoncePage)
    }
    else {
      this.navCtrl.push(LoginPage)
    }
    
  }

async  lescinqPremiers(){
    
    await  firebase.database().ref('logements').child(this.type)
      .child('louer').orderByKey().limitToFirst(5).on('child_added',snap=>{
        const key=snap.key
        let logement = snap.val();
        logement.key = key;
        this.alouer.push(logement)
        this.lkl = key;
      })
      this.finishedlouer=true;

    await  firebase.database().ref('logements').child(this.type)
      .child('vendre').orderByKey().limitToFirst(5).on('child_added',snap=>{
        const key=snap.key
        let logement = snap.val();
        logement.key = key;
        this.avendre.push(logement)
        this.lkv = key;
      });

  }

  scrollVendre($event){
    firebase.database().ref(`logements/${this.type}/vendre`).orderByKey()
    .startAt(this.lkv).limitToFirst(5).on('child_added',snap=>{
      const key = snap.key;
      let logement=snap.val();
      logement.key=key;
      if(key!==this.lkv){
        this.avendre.push(logement)
        this.lkv= key;
      }
    })
    $event.state='closed'
  }

  scrollLouer($event){
    firebase.database().ref(`logements/${this.type}/louer`).orderByKey()
    .startAt(this.lkl).limitToFirst(5).on('child_added',snap=>{
      const key = snap.key;
      let logement=snap.val();
      logement.key=key;
      if(key!==this.lkl){
        this.alouer.push(logement)
        this.lkl=key;
      }
    })
    $event.state='closed'
  }

  detail(param){
    this.navCtrl.push(DetailsAnnoncePage,{
      "annonce":param,
      "favoris":this.favorisTab
    })
    console.log(param)
  }

 async  favoris(){
   if(firebase.auth().currentUser){
    await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/favoris`).on('child_added',snap=>{
      this.favorisTab.push(snap.key)
    });
   }
   
  }
}
