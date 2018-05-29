import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Http, Response } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
  contact = {}
  constructor(public navCtrl: NavController,  private alertCtrl: AlertController,
              private http: Http, public navParams: NavParams, private callNumber: CallNumber,
              public loadingCtrl: LoadingController) {
  }

  callIt(number) {
     setTimeout(() => {
      let tel = number;
      window.open(`tel:${tel}`, '_system');
    },100);
  }

  contactMe() {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    var subject = this.contact["object"]
    var details = this.contact["details"]
    var user_email = this.contact["email"]
    var complete_name = this.contact["complete_name"]
    var mail = "service.client@radeema.ma";
    var message = "nom et prénom: " + complete_name + "<br> E-mail: "+user_email+ "<br> Message: "+details;
    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/envoyer-mail/mail/"+mail+"/subject/"+subject+"/content/"+message;

    loading.present();
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      if (data.includes("ion")) {
        this.presentAlert("Votre message a été envoyé");
      }
    });
  }

  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Message Info',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact');
  }

}

