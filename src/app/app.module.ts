import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { LoginPageModule} from '../pages/login/login.module'
import { LoginPage} from '../pages/login/login'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {DetailsAnnoncePage} from '../pages/details-annonce/details-annonce'
import {MotdepasseOubliePage} from '../pages/motdepasse-oublie/motdepasse-oublie'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {firebaseConfig} from './firebaseConfig';
import {InscriptionPage} from '../pages/inscription/inscription'
import {MonProfilePage} from '../pages/mon-profile/mon-profile'
import {ModifierProfilePage} from '../pages/modifier-profile/modifier-profile'
import {PublierAnnoncePage} from '../pages/publier-annonce/publier-annonce'
import {MesAnnoncesPage} from '../pages/mes-annonces/mes-annonces'
import {ListeCsPage} from '../pages/liste-cs/liste-cs';
import { ListePage } from '../pages/liste/liste';
import {MesFavorisPage} from '../pages/mes-favoris/mes-favoris'
import {TestPage}from '../pages/test/test'
import {ImagePicker}from '@ionic-native/image-picker'
import {Base64} from '@ionic-native/base64'
import {PhotoViewer} from  '@ionic-native/photo-viewer'
import {QuestionsPage} from '../pages/questions/questions'
import {VisitePage} from '../pages/visite/visite'
import { UserInfosProvider } from '../providers/user-infos/user-infos';
import {ServicesPage} from '../pages/services/services'
import {FCM} from '@ionic-native/fcm';
import {MessagePage} from '../pages/message/message'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MonProfilePage,
    ModifierProfilePage,
    LoginPage,
    PublierAnnoncePage,
    MotdepasseOubliePage,
    InscriptionPage,
    ListeCsPage,
    ListePage,
    MesAnnoncesPage,
    MesFavorisPage,
    DetailsAnnoncePage,
    QuestionsPage,
    TestPage,
    VisitePage,
    ServicesPage,
    MessagePage
  ],
  imports: [
    
    BrowserModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListeCsPage,
    ModifierProfilePage,
    MotdepasseOubliePage,
    InscriptionPage,
    MonProfilePage,
    PublierAnnoncePage,
    MesAnnoncesPage,
    HomePage,
    ListePage,
    ServicesPage,
    DetailsAnnoncePage,
    TestPage,
    QuestionsPage,
    MesFavorisPage,
    MessagePage,
    VisitePage
  ],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    ImagePicker,
    Base64,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserInfosProvider
  ]
})
export class AppModule {}
