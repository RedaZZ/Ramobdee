import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payment } from './payment';
import { TranslateModule }   from '../../app/translate/translate.module';

@NgModule({
  declarations: [
    Payment,
  ],
  imports: [
    IonicPageModule.forChild(Payment),
    TranslateModule
  ],
  exports: [
    Payment
  ]
})
export class PaymentModule {}
