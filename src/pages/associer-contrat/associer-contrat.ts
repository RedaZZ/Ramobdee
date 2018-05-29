import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Http, Response } from '@angular/http';
import { MesContrats } from '../mes-contrats/mes-contrats';


@IonicPage()
@Component({
  selector: 'page-associer-contrat',
  templateUrl: 'associer-contrat.html',
})
export class AssocierContrat {
  contracts={};
  user: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, private auth: AuthService, private alertCtrl: AlertController) {
    this.user = JSON.parse(this.auth.getUserInfo()) ;
  }

  addContrat() {
    console.log(this.contracts);
    var contrat = this.contracts["contrat"];
    var service = this.contracts["service"];
    var id_usr = this.user["id"];
    var cin = this.user["pce_idt"];
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/associer-contrat/num_cta/"+contrat+"/cod_typ_res/"+service+"/id_usr/"+id_usr+"/num_pce_idt/"+cin;
    console.log(url);
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      var code = data.split('|')[0];
      var message = data.split('|')[1];
      this.presentAlert(message, code);

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssocierContrat');
  }

   presentAlert(content:any, code) {
    let alert = this.alertCtrl.create({
      title: 'Message',
      message: content,
      buttons: [
        {
        text: 'OK',
        handler: () => {
          console.log(code);
          if (code == 1) {
            this.navCtrl.setRoot(MesContrats);
          }
        }
        }
      ]
    });
    alert.present();
  }

}
