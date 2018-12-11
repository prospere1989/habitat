import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Slides, LoadingController, AlertController } from 'ionic-angular';
import { AnnonceModel } from '../../models/annonceModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { publierValidator } from '../../validators/publierValidator';
import *as firebase from 'firebase'
import { LoginPage } from '../login/login';
import { ImagePicker } from '@ionic-native/image-picker'
import { Base64 } from '@ionic-native/base64'
import { PhotoViewer } from '@ionic-native/photo-viewer'
import { ASTWithSource } from '@angular/compiler';
import { DetailsAnnoncePage } from '../details-annonce/details-annonce';
@IonicPage()
@Component({
  selector: 'page-publier-annonce',
  templateUrl: 'publier-annonce.html',
})
export class PublierAnnoncePage {

  @ViewChild(Slides) slides: Slides;

  private annonce: AnnonceModel;

  //private load: LoadingController;

  private fGroup: FormGroup;

  casm: any[] = ["Chambres", "Appartements", "Studios", "Maisons"];

  cs: any[] = ["Chambres", "Studios"];

  mi: any[] = ["Immeubles", "Maisons"];

  ma: any[] = ["Maisons", "Appartements"];

  tebb: any[] = ["Terrains", "Bureaux", "Entrepots", "Boutiques"];

  constructor(public base64: Base64, public viewer: PhotoViewer, public alert: AlertController, public load: LoadingController,
    public picke: ImagePicker, public toast: ToastController, public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.annonce = new AnnonceModel()
    this.annonce.louer = "louer";
    this.annonce.moderne = "Modernes";
    this.annonce.meuble = "non";
    this.fGroup = this.builder.group({
      "type": ["", Validators.compose([Validators.required])],
      localisation: this.builder.array([this.init_localisation()]),
      finances: this.builder.array([this.init_finances()]),
      caracteristiques: this.builder.array([this.init_caracteristiques()])
      /*caracteristiques:this.builder.array([this.init_caracteristiques()])*/
      /*"moderne": null,// ["", Validators.compose([publierValidator.moderne])],
      "louer": null,// ["", Validators.compose([publierValidator.louer])],
      "niveau": ["", Validators.compose([publierValidator.niveau])],
      "chambres": ["", Validators.compose([publierValidator.positif])],
      "cuisines": ["", Validators.compose([publierValidator.positif])],
      "douches": ["", Validators.compose([publierValidator.positif])],
      "salons": ["", Validators.compose([publierValidator.positif])],
      "meuble": [""],
      "unite": ["", Validators.compose([publierValidator.unite])],
      "superficie": ["", Validators.compose([publierValidator.superficie])],
      "titre": ["", Validators.compose([publierValidator.titre])],*/
      //  prix: ["", Validators.compose([Validators.required, publierValidator.prix])],
      //  caution: ["", Validators.compose([publierValidator.caution_avance])],
      // avance: ["", Validators.compose([publierValidator.caution_avance])],
      //"ville": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      //"quartier": ["", Validators.compose([publierValidator.quartier])],

    })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublierAnnoncePage');
    //this.slides.lockSwipes(true)
  }

  publier() {
    let loder = this.load.create({
      content: "Enregistrement encours. Patientez svp",
      duration: 2000,
      dismissOnPageChange: true,

    });



    try {
      loder.present().then(() => {
        if (!firebase.auth().currentUser) {
          this.navCtrl.push(LoginPage);
        } else {
          this.annonce.user = firebase.auth().currentUser.uid;
          if (this.cs.indexOf(this.annonce.type) !== -1) {
            firebase.database().ref('logements').
              child(this.annonce.type).
              child(this.annonce.moderne).
              push(this.annonce).then(data=>{

                this.navCtrl.push(DetailsAnnoncePage, {
                  "annonce": this.annonce
                }).then(() => {
                  const startIndex = this.navCtrl.getActive().index - 1;
                  this.navCtrl.remove(startIndex, 1);
                })

              });
            loder.dismiss()
          }
          else {
            firebase.database().ref('logements').child(this.annonce.type)
              .child(this.annonce.louer)
              .push(this.annonce).then(data => {

                //alert('ok');
                this.navCtrl.push(DetailsAnnoncePage, {
                  "annonce": this.annonce
                }).then(() => {
                  const startIndex = this.navCtrl.getActive().index - 1;
                  this.navCtrl.remove(startIndex, 1);
                })

              })
            // loder.dismiss()
          }
        }
      })


    } catch (e) {
      loder.dismiss();
      this.toast.create({
        message: e.message,
        duration: 30000,
        dismissOnPageChange: true,
        closeButtonText: "okay",
        showCloseButton: true
      }).present()
    }
  }

  next() {
    let index = this.slides.getActiveIndex();

    switch (index) {
      case 0: {
        this.slides.lockSwipeToNext(true);
        this.slides.lockSwipeToPrev(true);
       
        if (!this.fGroup.controls['caracteristiques'].valid || !this.fGroup.controls['type'].valid) {
          this.slides.lockSwipeToNext(true);
          this.slides.lockSwipeToPrev(true);
         
        }
        else {
          this.slides.lockSwipeToNext(false)
          this.slides.slideNext()
          this.slides.lockSwipeToNext(true)
          this.slides.lockSwipeToPrev(true)
        }

        break;
      }

      case 1: {
        //this.slides.slideNext()

        if (!this.fGroup.controls['finances'].valid) {
          this.slides.lockSwipeToNext(true)
          this.slides.lockSwipeToPrev(true)
          
        }
        else if (this.fGroup.controls['finances'].valid) {
          this.slides.lockSwipeToNext(false)
          this.slides.slideNext();
          this.slides.lockSwipeToNext(true)
          this.slides.lockSwipeToPrev(true)
        }
        break;

      }

      case 2: {

        if (!this.fGroup.controls['localisation'].valid) {
          this.slides.lockSwipeToNext(true)
          this.slides.lockSwipeToPrev(true)
        }
        else if (this.fGroup.controls['localisation'].valid) {
          this.slides.lockSwipeToNext(false)
          this.slides.slideNext();
          this.slides.lockSwipeToNext(true)
          this.slides.lockSwipeToPrev(true)
        }
        break;
      }

      case 3: {
        this.publier();
      }
    }
    /* if (this.slides.getActiveIndex() == 3) {
       this.publier();
       console.log('ok')
     } else {
       this.slides.slideNext();
     }*/
    //console.log(this.fGroup.errors)
  }

  prev() {
    this.slides.lockSwipeToPrev(false)
    this.slides.slidePrev()
    this.slides.lockSwipeToPrev(true);
  }

  init_caracteristiques() {
    return this.builder.group(
      {
        "moderne": null,// ["", Validators.compose([publierValidator.moderne])],
        "louer": [""],// Validators.compose([publierValidator.louer])],
        "niveau": ["", Validators.compose([publierValidator.niveau])],
        "chambres": ["", Validators.compose([publierValidator.positif])],
        "cuisines": ["", Validators.compose([publierValidator.positif])],
        "douches": ["", Validators.compose([publierValidator.positif])],
        "salons": ["", Validators.compose([publierValidator.positif])],
        "meuble": [""],
        "unite": ["", Validators.compose([publierValidator.unite])],
        "superficie": ["", Validators.compose([publierValidator.superficie])],
        "titre": ["", Validators.compose([publierValidator.titre])]
      }
    )
  }

  init_finances() {
    return this.builder.group({
      prix: ["", Validators.compose([Validators.required, publierValidator.prix])],
      caution: ["", Validators.compose([publierValidator.caution_avance])],
      avance: ["", Validators.compose([publierValidator.caution_avance])],
    })
  }

  init_localisation() {
    return this.builder.group({
      "ville": ["", Validators.compose([Validators.required, Validators.minLength(3)])],
      "quartier": ["", Validators.compose([publierValidator.quartier])],
    })
  }

  take_photos() {
    this.picke.requestReadPermission().then(fullfilled => {
      this.picke.getPictures({
        quality: 65,
        maximumImagesCount: 10,
        width: 500,
        height: 500,
        outputType: 1
      }).then(data => {
        for (let i = 0; i < data.length; i++) {

          this.annonce.photo.push('data:image/png;base64,' + data[i])

        }
      }).catch(e => {

        this.toast.create({
          message: e.message,
          showCloseButton: true,
          closeButtonText: "Okay",
          dismissOnPageChange: true,
          duration: 30000
        }).present()
      })
    },
      rejected => {

        this.alert.create({
          message: rejected, //"Vous ne pouvez enregistrer une annonce sans photos",
          buttons: [{
            text: "Ok",
            role: "cancel"
          }]
        }).present();
      }
    )

  }

  del_photo(imag) {

    try {

      this.alert.create({
        message: "Voulez-vous supprimer cette photo de votre annonce ?",
        buttons: [
          {
            text: "OUI",
            handler: () => {
              this.annonce.photo.splice(this.annonce.photo.indexOf(imag), 1)
            },

          },
          {
            text: "NON",
            role: "Cancel"
          }

        ]
      }).present();

    } catch (e) {
      this.toast.create({
        message: "erreure de supression",
        closeButtonText: "OK",
        dismissOnPageChange: true,
        showCloseButton: true

      }).present()
    }

  }

  voir_photo(imag) {

    this.viewer.show(imag)
  }

  /*convertImgToBase64URL(url, callback, outputFormat){
   var img = new Image();
   img.crossOrigin = 'Anonymous';
   img.onload = function(){
       var canvas = document.createElement('CANVAS'),
       ctx = canvas.getContext('2d'), dataURL;
      /** canvas.height = img.height;
       canvas.width = img.width;*/
  /*  ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
    canvas = null; 
};
img.src = url;
}*/


}
