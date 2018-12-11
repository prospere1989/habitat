import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesFavorisPage } from './mes-favoris';

@NgModule({
  declarations: [
    MesFavorisPage,
  ],
  imports: [
    IonicPageModule.forChild(MesFavorisPage),
  ],
})
export class MesFavorisPageModule {}
