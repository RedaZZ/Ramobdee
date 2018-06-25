import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Platform } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { ChartPage } from '../conso/chart';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-conso',
  templateUrl: 'conso.html',
})
export class Conso {

  conso = {};
  consos: any;
  resultConso: any;
  listCta:any;
  shownGroup = null;
  defaultCta:any;
  isEmpty: boolean;
  noCta: boolean;
  pdfObj = null;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: Http, public loadingCtrl: LoadingController,
              public modalCtrl: ModalController, private file: File,
              private fileOpener: FileOpener, private plt: Platform) {

    var ctaArray = JSON.parse(window.localStorage.getItem('listCta'));
    if (!ctaArray) {
      this.noCta = true;
    }

    if (ctaArray && ctaArray.length > 0) {
      this.defaultCta=ctaArray[0];
      var array = [];

      ctaArray.forEach((cta, index) => {
        this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/getCtaDetail/num_cta/'+cta).map((res:Response) => res.json())
        .subscribe(data => {
          var result = data.split("|");
          array.push({'num':result[0], 'type':result[3]});
        });
      });

      this.listCta = array
      this.consos = this.getMaConso(this.defaultCta);
    }else{
      this.listCta = [];
      this.consos = [];
    }

  }

  getMaConso(ctaNum) {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });

    loading.present();
    this.http.get('https://www.radeema.ma/api/jsonws/WsForMob-portlet.wsmob/get-conso/numero_contrat/'+ctaNum).map((res:Response) => res.json())
    .subscribe(data => {
      loading.dismiss();
      this.consos = data;
      console.log(data);
      if (this.consos[0].ERR_COD !=="007") {
        this.isEmpty = false;
      }else{
        this.isEmpty = true;
      }
      this.resultConso = data;
    });
  }

  changeConso(e:any){
    this.consos = this.getMaConso(this.conso["objet"]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Conso');
  }

  toggleGroup(group) {
    console.log(group);
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

  // open modal to display charts
  openModal(e:any) {
    var labels = [];
    var data = [];
    this.consos.forEach(elmt => labels.push(elmt.PERIODE+"/"+elmt.ANNEE));
    this.consos.forEach(elmt => data.push(elmt.VOL_CSO_EAU_CSO));
    labels = labels.slice(0, 13);
    data = data.slice(0, 13);
    let myModal = this.modalCtrl.create(ChartPage, {labels: labels, data: data});
    myModal.present();
  }

  createPdf() {
    //var arrayResult: Array<Array<any>>;

    var arrayResult:string[][] = [["Période", "Date de la relève", "Type lecture", "Nombre de jour", "Index lu", "Volume consommé", "Volume facturé" ]];
    for (let i = 0; i < this.resultConso.length; i++){
      var value = this.resultConso[i];
      arrayResult.push([value.PERIODE+"/"+value.ANNEE, value.DAT_RELEVE, value.TYPE_INDEX, value.NOMBRE_JOUR, value.VAL_IDX_CSO, value.VOL_CSO_EAU_CSO, value.VOL_FAC_EAU_CSO]);
    }

    console.log(arrayResult);

    var docDefinition = {
      content: [
        { text: 'Ma consommation', style: 'header' },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
/*            widths: [ '*', 'auto', 100, '*' ],*/
            body: arrayResult
          }
        }
      ]
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
