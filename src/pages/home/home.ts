
import { NavController } from 'ionic-angular';
import {Component, OnInit} from '@angular/core'
import { Payment} from '../payment/payment';

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

  sendContract(){
    console.log(this.home);
    this.navCtrl.push(Payment, {
      contract: this.home["contract"]
    });
  }
}
