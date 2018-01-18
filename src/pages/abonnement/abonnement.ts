import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-abonnement',
  templateUrl: 'abonnement.html',
})
export class Abonnement {
  @ViewChild(Slides) slides: Slides;
  abonnement = {};
  active = true;
  steps: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.steps = "step1"
  }

  goForward(number) {
    this.slides.lockSwipes(false);
    this.slides.slideNext( 100);
    this.slides.lockSwipes(true);
    console.log(this.abonnement);
    this.steps = "step"+number
  }

  getBack(number) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(100);
    this.slides.lockSwipes(true);
    console.log(this.abonnement);
    this.steps = "step"+number
  }

  sendForm(){
    console.log("valid");
    console.log(this.abonnement);
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Domiciliation');
  }

}
