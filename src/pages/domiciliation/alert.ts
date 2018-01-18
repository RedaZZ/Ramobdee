import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {

  constructor(public viewCtrl: ViewController) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }
}