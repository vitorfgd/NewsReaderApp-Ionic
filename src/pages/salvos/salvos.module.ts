import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalvosPage } from './salvos';

@NgModule({
  declarations: [
    SalvosPage,
  ],
  imports: [
    IonicPageModule.forChild(SalvosPage),
  ],
  exports: [
    SalvosPage
  ]
})
export class SalvosPageModule {}
