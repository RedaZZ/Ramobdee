import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { FormPage } from '../reclamations/new_reclamation';
import { AuthService } from '../../providers/auth-service';


@IonicPage()
@Component({
  selector: 'page-reclamations',
  templateUrl: 'reclamations.html',
})
export class Reclamations {

  reclamation = {};
  reclamations: any;
  listCta:any;
  defaultCta:any;
  isEmpty: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService,
              private http: Http, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    this.defaultCta=ctaArray[0];
    this.isEmpty = true;

    if (ctaArray.length > 0) {
      var array = [];
      ctaArray.forEach((cta, index) => {
        this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/'+cta).map((res:Response) => res.json())
        .subscribe(data => {
          console.log(data);
          var result = data.split("|");
          array.push({'num':result[0], 'type':result[3]});
        });
      });

      this.listCta = array.reverse();
      this.reclamations = this.getMesReclamations(this.defaultCta);
    }else{
      this.listCta = [];
      this.reclamations = [];
    }
  }

  getMesReclamations(ctaNum) {
    var user = JSON.parse(this.auth.getUserInfo()) ;
    var id = user["id"];

    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();
    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-interventions/cta/'+ctaNum+'/id/'+id).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      this.reclamations = data;
      if (this.reclamations[0].ERR_COD !=="007") {
        this.isEmpty = false;
      }
    });
  }

  changeReclamation(e:any){
    this.isEmpty = true;
    this.reclamations = this.getMesReclamations(this.reclamation["objet"]);
  }

   openModal() {
    let myModal = this.modalCtrl.create(FormPage);
    myModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Reclamations');
  }

}
