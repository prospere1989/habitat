import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierProfilePage } from './modifier-profile';

@NgModule({
  declarations: [
    ModifierProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ModifierProfilePage),
  ],
})
export class ModifierProfilePageModule {}
