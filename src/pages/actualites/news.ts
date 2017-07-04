import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-show-news',
  templateUrl: 'show-news.html'
})

export class showNewsPage{
  public message;
  public createdAt;
  public externalLink;
  public publicUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams){

    this.message = navParams.get("message");
    this.createdAt = navParams.get("createdAt");
    this.publicUrl = navParams.get("publicUrl");
/*    this.externalLink = navParams.get("externalLink");*/
  }

  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }

}


