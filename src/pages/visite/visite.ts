import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as firebase from 'firebase';
import { messageValidator } from '../../validators/messageValidators';
import { visiteModel } from '../../models/visiteModel'
import { userModel } from '../../models/userModel';
import { AnnonceModel } from '../../models/annonceModel'
@IonicPage()
@Component({
  selector: 'page-visite',
  templateUrl: 'visite.html',
})
export class VisitePage {
  private ok: boolean = false;
  private cs: any[] = ["Chambres", "Studios"]
  private fGroup: FormGroup;
  private user: userModel;
  private message: visiteModel;
  private toast: Toast;
  private annonce: AnnonceModel;
  constructor(public fbuilder: FormBuilder, public view: ViewController,
    public navCtrl: NavController, public toastControl: ToastController,
    public navParams: NavParams) {
    this.message = new visiteModel();
    this.user = new userModel();
    this.fGroup = fbuilder.group({
      "nom": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "prenom": null,
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "objet": ["", Validators.compose([Validators.required])],

      "telephone": ["", Validators.compose([Validators.required, messageValidator.numero])]
    })
    this.ok = this.navParams.get('ok');

    if (firebase.auth().currentUser) {
      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).on('value', snap => {

        this.user = snap.val();
        this.user.key = snap.key;

      });
    }
    this.annonce=this.navParams.get('annonce');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  envoyer() {
    this.toast = this.toastControl.create({
      message: "Envoie de la demande. Patientez un moment ....",
      closeButtonText: "okay",
      dismissOnPageChange: true,
      showCloseButton: false
    })
    try {
      this.message.user = this.user;
      this.toast.present();
      if (!firebase.auth().currentUser) {
        this.message.user = this.user;
        if (this.cs.indexOf(this.annonce.type) == -1) {
          firebase.database().ref('logements')
            .child(this.annonce.type)
            .child(this.annonce.louer)
            .child(this.annonce.key)
            .child('Visites')
            .push(this.message).then(data => {
              this.toast.setMessage('Demande Envoyée. Nous revenons vers vous très bientot');
              this.toast.setShowCloseButton(true);
            });
        }
        else {
          firebase.database().ref('logements')
            .child(this.annonce.type)
            .child(this.annonce.moderne)
            .child(this.annonce.key)
            .child('visites')
            .push(this.message).then(data => {
              this.toast.setMessage('Demande Envoyée. Nous revenons vers vous très bientot');
              this.toast.setShowCloseButton(true);
            });
        }
        this.view.dismiss();
      }
      if (firebase.auth().currentUser) {
        if (this.cs.indexOf(this.annonce.type) == -1) {
          firebase.database().ref('logements')
            .child(this.annonce.type)
            .child(this.annonce.louer)
            .child(this.annonce.key)
            .child('visites')
            .push(this.message).then(data => {
              this.toast.setMessage('Demande Envoyée. Nous revenons vers vous très bientot');
              this.toast.setShowCloseButton(true);
            });
        }
        else {
          firebase.database().ref('logements').child(this.annonce.type).
            child(this.annonce.moderne).
            child(this.annonce.key).
            child('visites').
            push(this.message).then(data => {
              this.toast.setMessage('Demande Envoyée. Nous revenons vers vous très bientot');
              this.toast.setShowCloseButton(true);
            });
        }
        
      }
    }
    catch (e) {
      this.toast.setMessage(e.message)
     // this.toast.setMessage('Erreur lors de l\'envoie. Verifiez votre connexion internet et re-essayez')
      this.toast.setShowCloseButton(true);
    }
  }

  fermer() {
    this.view.dismiss();
  }



}
