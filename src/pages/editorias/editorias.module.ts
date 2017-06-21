import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditoriasPage } from './editorias';

@NgModule({
  declarations: [
    EditoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(EditoriasPage),
  ],
  exports: [
    EditoriasPage
  ]
})
export class EditoriasPageModule {}
