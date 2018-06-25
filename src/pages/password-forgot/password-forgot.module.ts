import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordForgot } from './password-forgot';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    PasswordForgot,
  ],
  imports: [
    IonicPageModule.forChild(PasswordForgot),
    TranslateModule
  ],
  exports: [
    PasswordForgot
  ]
})
export class PasswordForgotModule {}
