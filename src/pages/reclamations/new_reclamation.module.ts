import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormPage } from './new_reclamation';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    FormPage,
  ],
  imports: [
    IonicPageModule.forChild(FormPage),
    TranslateModule
  ],
  exports: [
    FormPage
  ]
})
export class NewReclamationModule {}
