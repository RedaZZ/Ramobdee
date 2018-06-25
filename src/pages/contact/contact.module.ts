import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Contact } from './contact';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Contact,
  ],
  imports: [
    IonicPageModule.forChild(Contact),
    TranslateModule
  ],
  exports: [
    Contact
  ]
})
export class ContactModule {}
