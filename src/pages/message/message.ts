import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserInfosProvider} from '../../providers/user-infos/user-infos';
import { messageModel } from '../../models/messageModel'
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  private fMessage: FormGroup;
  private message: messageModel;
  constructor(public user: UserInfosProvider,public fbuildr:FormBuilder,public toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.message= new messageModel();
    this.fMessage=  this.fbuildr.group({
        "nom":["",Validators.compose([Validators.required,Validators.minLength(4)])],
        "prenom":[""],
        "email":["",Validators.compose([Validators.required,Validators.email])],
        "objet":["",Validators.compose([Validators.required,Validators.minLength(3)])],
        "message":["",Validators.compose([Validators.required,Validators.minLength(10)])],
        "telephone":["",Validators.compose([Validators.required,Validators.minLength(9),Validators.maxLength(9)])]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  sendMessage(){
    this.message.user=this.user;
    this.toast.create({

    })
    if(this.user.key){
      firebase.database().ref('messages').child(this.user.key).push(this.user)
      .then(data=>{
        this.toast.create({
          message:"Message envoyé",
          closeButtonText :"okay",
          dismissOnPageChange:false,
          showCloseButton:true
        }).present();
        this.fMessage.reset();
        this.navCtrl.pop();
      });
    }
    else {
      firebase.database().ref('messages').push(this.message).then(data=>{
        this.toast.create({
          message:"Message envoyé",
          closeButtonText :"okay",
          dismissOnPageChange:false,
          showCloseButton:true
        }).present();
        this.fMessage.reset();
        this.navCtrl.pop();
      });
    }
  }

  ionViewWillEnter(){
    if(!firebase.auth().currentUser){
        this.user=null;
    }
  }
}
