import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsAnnoncePage } from './details-annonce';

@NgModule({
  declarations: [
    DetailsAnnoncePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsAnnoncePage),
  ],
})
export class DetailsAnnoncePageModule {}
