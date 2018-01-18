import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { AlertPage } from '../domiciliation/alert';

@IonicPage()
@Component({
  selector: 'page-domiciliation',
  templateUrl: 'domiciliation.html',
})
export class Domiciliation {
  @ViewChild(Slides) slides: Slides;
  account = {};
  submitted = false;
  active = true;
  steps: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.steps = "step1"
  }

  formBank() {
    this.submitted = true;
    console.log(this.account);
  }

  goForward(num) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2, 100);
    this.slides.lockSwipes(true);
    console.log(this.account);
    this.steps = "step"+num
  }

  getBack(num) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(100);
    this.slides.lockSwipes(true);
    console.log(this.account);
    this.steps = "step"+num
  }

  openModal(e:any) {
    if (e.checked) {
      let myModal = this.modalCtrl.create(AlertPage);
      myModal.present();
    }
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Domiciliation');
  }

}
