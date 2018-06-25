import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Http, Response } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-e-facture',
  templateUrl: 'e-facture.html',
})
export class EFacture {

  email:any;
  idUser:any;
  efacture = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private auth: AuthService, private http: Http, public loadingCtrl: LoadingController) {
    let info = JSON.parse(this.auth.getUserInfo()) ;
    this.email =null;
    if (info && info["email"] !== "undefined") {
      console.log(info);
      this.email = info["email"];
      this.idUser = info["id"];
    }
  }

  abonner(){
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/Abonner-efacture/mail/"+this.email+"/id_user/"+this.idUser+"/-e_rel";
    console.log(url);
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      loading.dismiss();
    });
  }

  isReadonly() {
    return this.isReadonly;   //return true/false
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EFacture');
  }

}
