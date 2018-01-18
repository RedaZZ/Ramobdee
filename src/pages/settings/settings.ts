import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService }   from '../../app/translate/translate.service';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  language:any;
  active=true;

  public translatedText: string;
  public supportedLanguages: any[];
/*  currentLang: string;*/

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _translate: TranslateService) {
    let locale = localStorage.getItem('appLang');
    this.language = locale;
  }

  onChange(e){
    this.selectLang(e);
  }

  changeLang(){
    localStorage.setItem('appLang', this.language);
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  ionViewDidLoad() {
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Français', value: 'fr' },
      { display: 'العربية', value: 'ar' },
    ];

    // set current langage
    let locale = localStorage.getItem('appLang');
    var currentLang = locale || "fr";
    this.selectLang(currentLang);
  }

    isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
      // set current lang;
      this._translate.use(lang);
      /*this.refreshText();*/
    }

    refreshText() {
      // refresh translation when language change
      this.translatedText = this._translate.instant('hello world');
    }
}
