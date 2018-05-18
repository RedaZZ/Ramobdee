import { Component } from '@angular/core';
import { ViewController, LoadingController} from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-new-reclamation',
  templateUrl: 'new_reclamation.html'
})
export class FormPage {
  reclamation={}
  active=true;
  listCta:any;
  isInfo=false;

  constructor(public viewCtrl: ViewController,private http: Http,
              public loadingCtrl: LoadingController, private auth: AuthService) {
    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
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
    }else{
      this.listCta = [];
    }
  }

  submitReclamation() {
    var num_cta = this.reclamation['contrat'];
    var cod_typ_int = this.reclamation['type'].split('|')[1];
    var cod_fam_int = this.reclamation['type'].split('|')[0];
    var cod_ori_int = this.reclamation['services'];
    var cmt = this.reclamation['comment'];
    var user = JSON.parse(this.auth.getUserInfo()) ;
    var id_usr = user["id"];

    var url = "https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/creat-intervention/id_usr/"+id_usr+"/num_cta/"+num_cta+"/cod_typ_int/"+cod_typ_int+"/cod_fam_int/"+cod_fam_int+"/cod_ori_int/"+cod_ori_int+"/cmt/"+cmt;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.http.get(url).map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      loading.dismiss();
      this.closeModal();
    });

  }

  onChange(value){
    console.log(value);
    if (value == "RC") {
      this.isInfo =false;
    } else {
      this.isInfo =true;
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}