import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { TranslateService }   from '../../app/translate/translate.service';
import { Events } from 'ionic-angular';
import { EventEmitter } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  language:any;
  active=true;
  public langChanged = new EventEmitter();

  public translatedText: string;
  public supportedLanguages: any[];
/*  currentLang: string;*/

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _translate: TranslateService, public event: Events,
              public loadingCtrl: LoadingController) {
    let locale = localStorage.getItem('appLang');
    this.language = locale;
  }

  onChange(e){
    this.selectLang(e);
  }

  changeLang(){
    localStorage.setItem('appLang', this.language);
    this.event.publish('lang.changed', this.language);
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
    var currentLang = locale || 'fr';
    this.selectLang(currentLang);
  }

  selectLang(lang: string) {
    // set current lang;
    this._translate.use(lang);
  }

  isCurrentLang(lang: string) {
    return lang === this._translate.currentLang;
  }
}
