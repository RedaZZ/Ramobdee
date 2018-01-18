import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormPage } from '../reclamations/new_reclamation';



@IonicPage()
@Component({
  selector: 'page-reclamations',
  templateUrl: 'reclamations.html',
})
export class Reclamations {

  reclamation = {};
  constructor(public modalCtrl: ModalController) {
  }

   openModal() {
    let myModal = this.modalCtrl.create(FormPage);
    myModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Reclamations');
  }

}
