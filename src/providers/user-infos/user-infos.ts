import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { } from '../'
import * as firebase from 'firebase';

@Injectable()
export class UserInfosProvider {

  email: string;
  motdepasse: string;
  motdepasse2: string;
  avatar: string;
  telephone: string;
  profile: string;
  nom: string;
  prenom: string;
  key: string;

  constructor() {
    const user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users').child(user.uid).on('value', snap => {
          const User = snap.val();
          this.email = User.email;
          this.nom = User.nom;
          this.telephone = User.telephone;
          this.prenom = User.prenom;
          this.key = snap.key;
          this.profile = User.profile;
        });
      }
    });
  }

}
