import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ListeCsPage } from '../liste-cs/liste-cs'
import { ListePage } from '../liste/liste';
import { FCM } from '@ionic-native/fcm';
import { UserInfosProvider } from '../../providers/user-infos/user-infos'
import { AnnonceModel } from '../../models/annonceModel';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private listeAnnonces: any[];
  private listeAnnoncesSimples: any[];
  private immeubles: number = 0;
  private studios: number = 0;
  private chambres: number = 0;
  private apparts: number = 0;
  private maisons: number = 0;
  private terrains: number = 0;
  private boutiques: number = 0;
  private entrepots: number = 0;
  private bureaux: number = 0;
  private lkModernes: String;
  private logement: AnnonceModel;
  private cs: any[] = ["Chambres", "Studios"]
  private notifie: boolean = true;
  constructor(public alert: AlertController, public user: UserInfosProvider,
    public fcm: FCM, public toast: ToastController, public loading: LoadingController, public navCtrl: NavController) {
    this.listeAnnonces = new Array();
    this.logement = new AnnonceModel();
    this.immeubles = 0;
    //this.reset()
    this.totals();
    //this.notified()
    //this.fcm.subscribeToTopic('all');
    /*this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {

        const type = data.type;
        const key = data.key;
        if(data.meuble){
            this.logement.meuble= data.meuble;
        }
        if(data.niveau){
          this.logement.niveau= data.niveau;
        }
        
        this.logement.type = data.type;
        this.logement.prix = data.prix;
        this.logement.ville = data.ville;
        this.logement.quartier = data.quartier;
        this.logement.photo = data.photos;
        this.logement.key = key;

        if (type == 'Chambres' || type == 'Studios') {
          this.logement.avance = data.avance;
          this.logement.moderne = data.moderne;
          
        }

        else if(type=='Appartements' || type=='Maisons'){
            this.logement.chambres = data.chambres;
            this.logement.douches = data.douches;
            this.logement.cuisines = data.cuisines;
            this.logement.salons = data.salons
        }

        if(data.superficie){
            this.logement.superficie=data.superficie;
        }

        this.navCtrl.push(DetailsAnnoncePage,{
          "annonce":this.logement
        });
        
      }
    })*/
  }

  async notified() {

    if (firebase.auth().currentUser) {
      if (await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/`).child('notif').equalTo("nonok")) {
        this.notifie = false;
      }
      else {
        this.notifie = true;
      }
    }
  }
  reset() {
    this.studios = 0; this.chambres = 0;
    this.apparts = 0;
    this.maisons = 0;
    this.terrains = 0;
    this.boutiques = 0;
    this.entrepots = 0;
    this.bureaux = 0;
  }
  async totals() {
    this.reset();
    firebase.database().ref(`logements/Chambres/Simples`).on('value', snap => {
      this.chambres += snap.numChildren();
    })
    firebase.database().ref(`logements/Chambres/Modernes`).on('value', snap => {
      this.chambres += snap.numChildren()
    });

    firebase.database().ref(`logements/Studios/Simples`).on('value', snap => {
      this.studios += snap.numChildren();
    })
    firebase.database().ref(`logements/Studios/Modernes`).on('value', snap => {
      this.studios += snap.numChildren()
    })
    firebase.database().ref('logements/Bureaux/louer').on('value', snap => {
      this.bureaux += snap.numChildren()
    })
    firebase.database().ref('logements/Bureaux/vendre').on('value', snap => {
      this.bureaux += snap.numChildren()
    })

    firebase.database().ref('logements/Boutiques/louer').on('value', snap => {
      this.boutiques += snap.numChildren()
    })
    firebase.database().ref('logements/Boutiques/vendre').on('value', snap => {
      this.boutiques += snap.numChildren()
    })

    firebase.database().ref('logements/Entrepots/louer').on('value', snap => {
      this.entrepots += snap.numChildren()
    })
    firebase.database().ref('logements/Entrepots/vendre').on('value', snap => {
      this.entrepots += snap.numChildren()
    })

    firebase.database().ref('logements/Terrains/louer').on('value', snap => {
      this.terrains += snap.numChildren()
    })
    firebase.database().ref('logements/Terrains/vendre').on('value', snap => {
      this.terrains += snap.numChildren()
    })

    firebase.database().ref('logements/Maisons/louer').on('value', snap => {
      this.maisons += snap.numChildren()
    })
    firebase.database().ref('logements/Maisons/vendre').on('value', snap => {
      this.maisons += snap.numChildren()
    })

    firebase.database().ref('logements/Appartements/louer').on('value', snap => {
      this.apparts += snap.numChildren()
    })
    firebase.database().ref('logements/Appartements/vendre').on('value', snap => {
      this.apparts += snap.numChildren()
    })

    firebase.database().ref('logements/Immeubles/louer').on('value', snap => {
      this.immeubles += snap.numChildren()
    })
    firebase.database().ref('logements/Immeubles/vendre').on('value', snap => {
      this.immeubles += snap.numChildren()
    })
  }

  liste(param) {

    try {
      if (this.cs.indexOf(param) !== -1) {
        this.navCtrl.push(ListeCsPage, {
          "type": param
        })
      }
      else {
        console.log(param)
        this.navCtrl.push(ListePage, {
          "type": param
        })
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
  }

  ionViewDidEnter() {
    //this.reset();
  }

  async gererNotif() {
    if (this.notifie) {
      this.alert.create({
        message: "Voulez-vous desactiver les notifications ? NB: Vous ne recevrez plus d'alerte lorsqu'une annonce sera publiee",
        buttons: [{
          text: "Oui",
          handler: data => {
            this.fcm.unsubscribeFromTopic('all').then(() => {
              this.toast.create({
                message: "Operation reussie. Vous ne recevrez plus de notifications",
                closeButtonText: "OK",
                showCloseButton: true
              }).present();

              this.notifie = false;
            });
          },

        }, {
          text: "Non",
          role: "cancel"
        }]
      }).present()
    }
    else {
      this.alert.create({
        message: "Voulez-vous activer les notifications ? NB: Vous recevrez des alertes lorsqu'une annonce sera publiée",
        buttons: [{
          text: "Oui",
          handler: data => {
            /* this.fcm.subscribeToTopic('all').then(() => {
               this.toast.create({
                 message: "Operation réussie. Vous  recevrez  des  notifications pour chaque nouvelle annonce publiée",
                 closeButtonText: "OK",
                 showCloseButton: true
               }).present();
               this.notifie = false;
             });*/
          },

        }, {
          text: "Non",
          role: "cancel"
        }]
      }).present()
    }
  }

}
