import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-reclamation',
  templateUrl: 'new_reclamation.html'
})
export class FormPage {
  reclamation={}
  active=true;

  constructor(public viewCtrl: ViewController) {}

  submitReclamation() {
    console.log("submited = "+this.reclamation);
    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}