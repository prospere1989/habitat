import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PublierAnnoncePage } from '../publier-annonce/publier-annonce';
import * as firebase from 'firebase'
import { LoginPage } from '../login/login';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';

@IonicPage()
@Component({
  selector: 'page-liste-cs',
  templateUrl: 'liste-cs.html',
})
export class ListeCsPage {
  private listeFavoriskey:any[]
  private type: string;
  private listeCsModernes: any[] = new Array();
  private listeCsSimples: any[] = new Array();
  private lks: string;
  private lkm: string;
  private cs: any[] = ["Chambres", "Studios"]
  private moderne: string = 'Modernes'
  private listeAnnonces: any[];
  private listeAnnoncesSimples: any[];
  private finishedSimples: boolean = true;
  private finishedModernes : boolean=true;
  private ok: boolean = false;
  private lkModernes: String;

  constructor(public loading: LoadingController, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    this.type = this.navParams.get('type');
    this.listeCsModernes = new Array();
    this.listeCsSimples = new Array();
    this.listeFavoriskey = new Array();
    this.favoris();
    this.liste_modernes()
    this.liste_simples()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeCsPage');

  }

  publier() {
    if(firebase.auth().currentUser){
      this.navCtrl.push(PublierAnnoncePage)
    }
    else {
      this.navCtrl.push(LoginPage)
    }
    
  }
  detail(param){
    this.navCtrl.push(DetailsAnnoncePage,{
      "annonce":param,
      "favoris":this.listeFavoriskey
    })
  }
  async  favoris(){
    if(firebase.auth().currentUser){
     await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/favoris`).on('child_added',snap=>{
       this.listeFavoriskey.push(snap.key)
     });
    }
    
   }
  async liste_simples() {
    await firebase.database().ref('logements').child(this.type).child('Simples').orderByKey().limitToFirst(5)
      .on('child_added', snap => {
        const key = snap.key;
        let logement = snap.val();
        logement.key = key;
        this.listeCsSimples.push(logement)
        this.lks = key;
        this.finishedSimples = false;
      })
    this.ok = true;
    console.log(this.lks)
  }

  async   liste_modernes() {
    await firebase.database().ref('logements').child(this.type).child('Modernes').orderByKey().limitToFirst(5)
      .on('child_added', snap => {
        const key = snap.key;
        let logement = snap.val();
        logement.key = key;
        this.listeCsModernes.push(logement);
        this.lkm = key;
      })
      //$param.state = 'closed'
  }

  scrollSimples($param) {

    firebase.database().ref(`logements/${this.type}`).child('Simples').orderByKey().
      startAt(this.lks).limitToFirst(5).on('child_added', snap => {
        let logement = snap.val();
        const key = snap.key;
        logement.key = key;
        if (key !== this.lks) {
          this.listeCsSimples.push(logement)
          this.lks = key;
          this.finishedSimples = false;
        }
      });
    $param.state = 'closed'

  }

  scrollModernes($param) {
    firebase.database().ref(`logements/${this.type}`).child('Modernes').orderByKey().
      startAt(this.lkm).limitToFirst(5).on('child_added', snap => {
        let logement = snap.val();
        const key = snap.key;
        logement.key = key;
        if (key !== this.lkm) {
          this.listeCsModernes.push(logement)
          this.lkm = key;
          this.finishedModernes = false;
        }
      });

    $param.state = 'closed'

  }
  /* async liste(param) {
 
     try {
       var lks:string;
       this.listeAnnonces = new Array();
       this.listeAnnoncesSimples = new Array();
       
       if (this.cs.indexOf(param) !== -1) {
         this.loading.create({
           content: "Chargement des annonces",
           dismissOnPageChange: true
         }).present();
         
         await firebase.database().ref('logements').child(param).child('Modernes').orderByKey().limitToFirst(5)
           .on('child_added', snap => {
          
             let annonce = snap.val();
             annonce.key = snap.key
             this.listeAnnonces.push(annonce)
 
           })
           
         await  firebase.database().ref('logements').child(param).child('Simples').orderByKey().limitToFirst(5)
           .on('child_added',snap=>{
             let logement =snap.val();
             logement.key=snap.key;
             this.listeAnnoncesSimples.push(logement)
             this.lks=snap.key;
           })
            console.log(this.lks)
         this.navCtrl.push(ListeCsPage, {
           "listeModernes": this.listeAnnonces,
           "listeSimples":this.listeAnnoncesSimples,
           "lks":lks,
           "lkm":this.lkModernes,
           "type": param
         });
       }
 
     } catch (e) {
       
         this.toast.create({
         message: e.message,
         closeButtonText: "Okay",
         dismissOnPageChange: true,
         showCloseButton: true,
         duration: 30000
       }).present()
     }
   }*/
}
