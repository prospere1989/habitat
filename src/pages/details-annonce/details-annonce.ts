import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, Alert, ToastController, Toast } from 'ionic-angular';
import { AnnonceModel } from '../../models/annonceModel';
import * as firebase from 'firebase';
import { QuestionsPage } from '../questions/questions'
import { VisitePage } from '../visite/visite'
@IonicPage()
@Component({
  selector: 'page-details-annonce',
  templateUrl: 'details-annonce.html',
})
export class DetailsAnnoncePage {

  private user: any;
  private vrai: boolean = false;
  private toast: Toast;
  private annonce: AnnonceModel;
  private saved: boolean = false;
  private favorisTab: any[];
  private edit: boolean = false;
  casm: any[] = ["Chambres", "Appartements", "Studios", "Maisons"];
  cs: any[] = ["Chambres", "Studios"];
  mi: any[] = ["Immeubles", "Maisons"];
  ma: any[] = ["Maisons", "Appartements"];
  tebb: any[] = ["Terrains", "Bureaux", "Entrepots", "Boutiques"];

  constructor(public toastControl: ToastController, public modal: ModalController,
    public alert: AlertController, public navCtrl: NavController, public navParams: NavParams) {

    this.annonce = this.navParams.get('annonce');
    // this.vrai= firebase.auth().currentUser.uid !== this.annonce.user
    this.favorisTab = this.navParams.get('favoris');
    this.user = firebase.auth().currentUser;
    
    if (this.favorisTab) {
      if (this.favorisTab.indexOf(this.annonce.key) !== -1) {
        this.saved = true;
        this.vrai = false;
      }
    }

    if (this.user) {
      if (this.user.uid == this.annonce.user) {
        console.log(this.user.uid + ' ' + this.annonce.user)
        this.edit = true;
        //this.saved = false;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsAnnoncePage');

  }

  ionViewDidEnter() {
    // this.user = firebase.auth().currentUser;

    //this.vrai= firebase.auth().currentUser.uid !== this.annonce.user
  }
  modifier() {

  }

  save() {

    this.toast = this.toastControl.create({

      dismissOnPageChange: true,
      message: "enregistement de l'annonce dans vos favoris....",
      closeButtonText: "Okay"

    });

    let alert = this.alert.create({
      message: "Voulez-vous enregistrer cette annonce dans vos favoris ?",
      title: "Enregistrement dans les favoris",
      buttons: [
        {
          text: "Enregistrer",
          handler: () => {
            this.toast.present();
            firebase.database().ref('users')
              .child(firebase.auth().currentUser.uid).child('favoris').child(this.annonce.key)
              .set(this.annonce).then((data) => {
                this.saved = true;
                this.vrai = false;
                this.toast.setMessage("L'annonce a étée enregistrée dqns vos favoris.")
                this.toast.setShowCloseButton(true)
                this.toast.setDuration(9000);

              });
          }
        }, {
          text: "Annuler",
          role: "cancel",
          handler: () => {

          }
        }
      ]
    }).present()
  }

  unsave() {
    this.toast = this.toastControl.create({

      dismissOnPageChange: true,
      message: "enregistement de l'annonce dans vos favoris....",
      closeButtonText: "Okay"

    })
    this.alert.create({
      title: "Gestion des favoris",
      message: "Voulez-vous retirer l'annonce de vos favoris",
      buttons: [{
        text: "Oui",
        handler: () => {
          this.toast.present();
          firebase.database().ref('users')
            .child(firebase.auth().currentUser.uid)
            .child(`favoris/${this.annonce.key}`).remove().then(data => {
              this.saved = false;
              this.favorisTab.splice(this.favorisTab.indexOf(this.annonce.key), 1)
              this.toast.setMessage("L'annonce a étée retirée de vos favoris.")
              this.toast.setShowCloseButton(true)
              this.toast.setDuration(9000);
            });
        },

      }, {
        text: "Non",
        role: " cancel",
        handler: () => {

        }
      }]
    }).present()

  }

  question() {
    this.modal.create(QuestionsPage, {
      "ok": true,
      "annonce": this.annonce
    }).present();

  }

  visiter() {
    this.modal.create(VisitePage, {
      "ok": true,
      "annonce": this.annonce
    }).present();

  }
}
