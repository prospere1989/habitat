import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublierAnnoncePage } from './publier-annonce';

@NgModule({
  declarations: [
    PublierAnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(PublierAnnoncePage),
  ],
})
export class PublierAnnoncePageModule {}
