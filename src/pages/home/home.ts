
import { NavController, LoadingController, AlertController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core'
import { Payment} from '../payment/payment';
import { Auth} from '../auth/auth';
import { PasswordForgot } from '../password-forgot/password-forgot';
import { Http, Response } from '@angular/http';

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
  user={};

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
   public loadingCtrl: LoadingController, private http: Http) {
  };

  login(){

    // init loading spinner
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    var login = this.user['login'];
    var password = this.user['password'];
    console.log(this.user);

    var urlGetId = "https://921012d9.ngrok.io/api/jsonws/WsForMob-portlet.wsmob/verifier-mot-passe/mail/"+login+"/password/"+password;
    // Api call start
    loading.present();

    this.http.get(urlGetId).map((res:Response) => res.json()).subscribe(data => {
      console.log(data);
      // api call done
      loading.dismiss();

      var splitted = data.split("|");
      if (splitted[0] === "-1") {
        console.log(splitted[2]);
        this.presentAlert(splitted[1]);
      } else {
        // creation avec succées
        this.presentAlert("Yaaaaaaay!!!");
      }
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
