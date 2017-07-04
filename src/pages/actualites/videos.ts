import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-show-videos',
  templateUrl: 'show-videos.html'
})

export class showVideosPage{
  public title;
  public description;
  public time;
  public imageUrl;
  public videoId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer ){
    this.title = navParams.get("title");
    this.description = navParams.get("description");
    this.time = navParams.get("time");
    this.imageUrl = navParams.get("imageUrl");
    this.videoId = navParams.get("videoId");
  }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data, so
    // that it's easier to check if the value is safe.
    let dangerousVideoUrl = 'https://www.youtube.com/embed/' + id + '?&showinfo=0&controls=0';
    return this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  }

  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }

}


