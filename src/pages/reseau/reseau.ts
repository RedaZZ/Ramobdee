import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { showDataPage} from '../reseau/show';


@Component({
  selector: 'page-reseau',
  templateUrl: 'reseau.html',
})

@Injectable()
export class Reseau {
  reseau: any;
  agences: any;
  espace: any;
  tashilats: any;
  fawatirs: any;
  gabs: any;
  agencesInitial: any;
  tashilatsInit: any;
  fawatirsInit: any;
  gabsInit: any;

  constructor( private http: Http, public navCtrl: NavController) {
    this.reseau = "agence";
    this.espace = "tashilat";
    /*Get Agences*/
    http.get('libresources/agences.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.agencesInitial = data;
       this.agences = data;
    });

    /*Get Espace Tashilats*/
    http.get('libresources/espace_services.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.tashilatsInit = data;
       this.tashilats = data;
    });

    /*Get Espace Fawatir*/
    http.get('libresources/espace_fawatir.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.fawatirsInit = data;
       this.fawatirs = data;
    });

    /*Get List des Gab*/
    http.get('libresources/gab.json').map((res:Response) => res.json())
    .subscribe(data => {
       this.gabsInit = data;
       this.gabs = data;
    });
  }

  searchAgence(searchbar) {
    this.agences = this.agencesInitial;
    var q = searchbar.target.value;
    if (q.trim() == '') {
        return;
    }
    this.agences = this.agences.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  searchEspace(searchbar) {
    this.tashilats = this.tashilatsInit;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.tashilats = this.tashilats.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  searchFawatir(searchbar) {
    this.fawatirs = this.fawatirsInit;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.fawatirs = this.fawatirs.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }

  searchGab(searchbar) {
    this.gabs = this.gabsInit;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }
    this.gabs = this.gabs.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }

  /*Show Page*/
  showData(object, kind){
    if (kind === "Agence") {
      this.navCtrl.push(showDataPage, {
        name: object.name,
        tel: object.tel,
        kind: kind,
        adress: object.adress,
        lat: object.lat,
        lng: object.lng
      });
    } else {
      this.navCtrl.push(showDataPage, {
          name: object.name,
          kind: kind,
          adress: object.adress
        });
    }
  }

}
