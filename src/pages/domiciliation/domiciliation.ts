import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { IonicPage, NavController, NavParams, Slides, ModalController,
         AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { AlertPage } from '../domiciliation/alert';
import { AuthService } from '../../providers/auth-service';


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
  steps: any;

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController,
              public modalCtrl: ModalController, private http: Http,
              public viewCtrl: ViewController, private auth: AuthService,
              private alertCtrl: AlertController) {
    this.steps = "step1"
  }

  formBank() {
    console.log(this.account);
    var user = JSON.parse(this.auth.getUserInfo()) ;
    var id_usr = user["id"];
    var tit = this.account["complete_name"];
    var pce_idt = this.account["cin"];
    var no_tel = this.account["tel"];
    var adr = this.account["adress"];
    var cod_bnk = this.account["bank_name"];
    var gui = this.account["agence"];
    var rib = this.account["number_account"];

    var url = "https://radeema.ma/api/jsonws/WsForMob-portlet.wsmob/envoyerDomicilBanc/id/"+id_usr+"/tit/"+tit+"/adr/"+adr+"/gui/"+gui+"/no_tel/"+no_tel+"/pce_idt/"+pce_idt+"/cod_bnk/"+cod_bnk+"/rib/"+rib;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      this.submitted = true;
      loading.dismiss();
      this.closeModal();
      var message = data.split(";")[1]
      this.presentAlert(message);
    });
    this.navCtrl.setRoot(Domiciliation);
  }

  goForward(num) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(2, 100);
    this.slides.lockSwipes(true);
    console.log(this.account);
    this.steps = "step"+num
  }

  getBack(num) {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(100);
    this.slides.lockSwipes(true);
    console.log(this.account);
    this.steps = "step"+num
  }

  openModal(e:any) {
    if (e.checked) {
      let myModal = this.modalCtrl.create(AlertPage);
      myModal.present();
    }
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
    console.log('ionViewDidLoad Domiciliation');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  presentAlert(content:any) {
    let alert = this.alertCtrl.create({
      title: 'Message Info',
      subTitle: content,
      buttons: ['Ok']
    });
    alert.present();
  }

}
