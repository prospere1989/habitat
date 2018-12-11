import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonProfilePage } from './mon-profile';

@NgModule({
  declarations: [
    MonProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(MonProfilePage),
  ],
})
export class MonProfilePageModule {}
