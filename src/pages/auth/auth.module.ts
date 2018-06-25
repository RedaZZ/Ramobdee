import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Auth } from './auth';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Auth,
  ],
  imports: [
    IonicPageModule.forChild(Auth),
    TranslateModule
  ],
  exports: [
    Auth
  ]
})
export class AuthModule {}
