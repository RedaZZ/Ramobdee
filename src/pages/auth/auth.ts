import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the Auth page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class Auth {
  @ViewChild(Slides) slides: Slides;

  steps: any;
  user={};
  active=true;
  contracts={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.steps = "step1"
  }

  goForward(number) {
    this.slides.lockSwipes(false);
    this.slides.slideNext(50);
    this.slides.lockSwipes(true);
    this.steps = "step"+number
  }

  getBack(number) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(50);
    this.slides.lockSwipes(true);
    this.steps = "step"+number
  }

  register(){
    console.log(this.user);
  }

  addContrat(){

  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Auth');
  }

}
