import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeCsPage } from './liste-cs';

@NgModule({
  declarations: [
    ListeCsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeCsPage),
  ],
})
export class ListeCsPageModule {}
