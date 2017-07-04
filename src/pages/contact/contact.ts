import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the Contact page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
  contact = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
  }

  callIt(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  contactMe() {
    console.log(this.contact);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact');
  }

}
