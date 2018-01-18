import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordForgot } from './password-forgot';

@NgModule({
  declarations: [
    PasswordForgot,
  ],
  imports: [
    IonicPageModule.forChild(PasswordForgot),
  ],
  exports: [
    PasswordForgot
  ]
})
export class PasswordForgotModule {}
