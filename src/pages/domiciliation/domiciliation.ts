import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  formBank() {
     this.submitted = true;
     console.log(this.account);
  }

  goForward() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2, 100);
    this.slides.lockSwipes(true);
    console.log(this.account);
  }

  getBack() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(100);
    this.slides.lockSwipes(true);
    console.log(this.account);
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Domiciliation');
  }

}
