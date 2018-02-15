import { NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core'
import { Payment} from '../payment/payment';
import { Auth} from '../auth/auth';
import { PasswordForgot } from '../password-forgot/password-forgot';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth-service';

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

  home= {};
  user= {};

  userName: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
   public loadingCtrl: LoadingController, private http: Http, private auth: AuthService) {

    let info = JSON.parse(this.auth.getUserInfo()) ;
    console.log("-------"+info);

    this.userName =null;
    if (info && info["nom"] !== "undefined") {
      this.userName = info["nom"]+" "+info["prenom"];
    }
  };

  login(){
    var login = this.user['login'];
    var password = this.user['password'];

    if (login && password) {
      this.auth.login({email:login, password:password}).subscribe(allowed => {
        if (allowed) {
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        } else {
          console.log("Access Denied");
        }
      },
      error => {
        console.log(error);
      });
    }
  }

  signout(){
    this.auth.logout().subscribe(logedOut => {
      console.log(logedOut);
      console.log("logedOut");
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    /*        if (allowed) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    } else {
    console.log("Access Denied");
    }*/
    },
    error => {
      console.log(error);
    });
   }

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

    // display Alert when user created or not
  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Authentification',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

}
