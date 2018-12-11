import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ToastController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login'
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {firebaseConfig} from './firebaseConfig';
import * as firebase from 'firebase'
import {InscriptionPage}from '../pages/inscription/inscription'
import {MonProfilePage} from '../pages/mon-profile/mon-profile'
import {PublierAnnoncePage} from '../pages/publier-annonce/publier-annonce'
import { MesAnnoncesPage } from '../pages/mes-annonces/mes-annonces';
//import { MesFavorisPage } from '../pages/mes-favoris/mes-favoris';
import { MesFavorisPage } from '../pages/mes-favoris/mes-favoris';
import {TestPage}from '../pages/test/test'
import { ServicesPage } from '../pages/services/services';
import {FCM} from '@ionic-native/fcm'
import { DetailsAnnoncePage } from '../pages/details-annonce/details-annonce';
import { MessagePage} from '../pages/message/message';
import {UserInfosProvider} from '../providers/user-infos/user-infos'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  private user: any;
  pages: Array<{title: string, component: any}>;

  constructor(public alert:AlertController,
    public fcm:FCM,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.user = user;
      }
    });
    
    //this.alert.create({message:"ok"}).present()

  /*  this.fcm.onNotification().subscribe(data=>{
       let annonce:any;
       annonce.key=data.key;
       annonce.type=data.type;
       if(data.louer){
          annonce.louer=data.louer;
       }
       if(data.moderne){
         annonce.moderne=data.moderne;
       }
      if(data.wasTapped){
        this.nav.push(DetailsAnnoncePage,{
         "annonce":annonce
        })
      }
    });*/

    this.initializeApp();
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      
      this.splashScreen.hide();
      
    });
  }

  message(){

    this.nav.push(MessagePage);

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  login(){
    this.nav.push(LoginPage)
  }

  logout(){
    firebase.auth().signOut().then(user=>{
      this.user = null;
    })
  }

  mesfavoris(){
    this.nav.push(MesFavorisPage)
  }

  inscription(){
     this.nav.push(InscriptionPage)
  }

  profile(){
      this.nav.push(MonProfilePage)
  }

  publier(){

    if(this.user){
      this.nav.push(PublierAnnoncePage)
    }
    else {
      this.nav.push(LoginPage)
    }
  }
  
  mesannonces(){
    this.nav.push(MesAnnoncesPage)
  }

  services(){
    this.nav.push(ServicesPage);
  }
  
}
