import { NavController, LoadingController, AlertController, Platform} from 'ionic-angular';
import {Component, OnInit} from '@angular/core'
import { Payment} from '../payment/payment';
import { Auth} from '../auth/auth';
import { PasswordForgot } from '../password-forgot/password-forgot';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import * as $ from 'jquery';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';


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
   public loadingCtrl: LoadingController, private http: Http, private auth: AuthService,
   public platform: Platform, private iab: InAppBrowser, private browserTab: BrowserTab) {

    let info = JSON.parse(this.auth.getUserInfo()) ;

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
          this.presentAlert("Veuillez cliquer sur le menu pour accéder aux différentes options");
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
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  openLink(){
    var url = "https://www.fatourati.ma/FatLite/ma/Radeema/formulaire?cid=01&fid=1010";

    this.browserTab.isAvailable().then((isAvailable: boolean) => {
      if(isAvailable) {
        this.browserTab.openUrl(url);
      } else {
        // if custom tabs are not available you may  use InAppBrowser
        console.log("custom not available");
        let browser = new InAppBrowser;
        browser.create(url,'_system');
      }
    });
  }

    // display Alert when user created or not
  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Bienvenue',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

}
