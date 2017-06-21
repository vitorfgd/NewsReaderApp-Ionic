import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeitorPage } from './leitor';

@NgModule({
  declarations: [
    LeitorPage,
  ],
  imports: [
    IonicPageModule.forChild(LeitorPage),
  ],
  exports: [
    LeitorPage
  ]
})
export class LeitorPageModule {}
