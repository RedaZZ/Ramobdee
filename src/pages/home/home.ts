
import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core'
import { Payment} from '../payment/payment';
import { Auth} from '../auth/auth';
import { PasswordForgot } from '../password-forgot/password-forgot';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	slides:any[];
	first:any;
	mySlideOptions = {
		pager:true,
		autoHeight: true
	};
  home= {}
  constructor(public navCtrl: NavController) {
  };

	ngOnInit(){
		this.first='1'
	}

  goToRegister(){
    this.navCtrl.push(Auth);
  }

  sendContract(){
    console.log(this.home);
    this.navCtrl.push(Payment, {
      contract: this.home["contract"]
    });
  }

  forgot(){
    this.navCtrl.push(PasswordForgot);
  }
}
