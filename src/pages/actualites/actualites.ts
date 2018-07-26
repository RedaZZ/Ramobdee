import { Component, Injectable } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { showNewsPage} from '../actualites/news';
import { showVideosPage} from '../actualites/videos';


@Component({
  selector: 'page-actualites',
  templateUrl: 'actualites.html'
})

@Injectable()
export class ActualitesPage {
  selectedItem: any;
  actu: any;
  posts: any;
  videos: any;

  constructor ( private http: Http, public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.actu = "news";
    this.posts = this.retrieveFacebookData();
    this.videos = this.retrieveYoutubeData();
  }

  getFacebookData() {
    var access_token = "EAAM4ZA5qSyPYBADf6CHuRW5b5ZBdn9HyOKBmd0mpESRCCGJStUlXskWzaJ5ZC6hMtchnLBKAu1vWcJhPA87chUnF73DEu37W0WNsMEJ9KczSrzBYyiNbK32tbDYiCLOXxXBYYzDzPRzb7z1el3NxLsHQZCHjuGkLmH0Fx9FfygZDZD";
    return this.posts = this.http.get("https://graph.facebook.com/v3.0/227387263967694/feed?fields=id,created_time,message,link,full_picture,type&access_token="+access_token).map((res:Response) => res.json());
  }

  retrieveFacebookData() {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });
    loading.present();
    this.getFacebookData().subscribe(val => {
      loading.dismiss();
      console.log(val);
      this.posts = val.data.filter(v => v.type !== "video");
    });
  }

  getYoutubeData() {
    return this.videos = this.http.get("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCFl5dUovd_Wr1AT0aprFAJA&maxResults=25&key=AIzaSyAfFF-Db5ZxfDqUXOmle5bDy9cORUcaPGg").map((res:Response) => res.json());
  }

  retrieveYoutubeData() {
    let loading = this.loadingCtrl.create({
      content: 'Merci de patienter...'
    });
    loading.present();
    this.http.get("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCFl5dUovd_Wr1AT0aprFAJA&maxResults=25&key=AIzaSyAfFF-Db5ZxfDqUXOmle5bDy9cORUcaPGg").map((res:Response) => res.json()).subscribe(val => {
      loading.dismiss();
      console.log(val);
      this.videos = val.items.filter(v => v.id.kind === "youtube#video");
    });
    //return this.getYoutubeData().subscribe(val => this.videos = val);

  }

  /* Show News Page*/
  showNews(post){
    this.navCtrl.push(showNewsPage, {
      message: post.message,
      publicUrl: post.full_picture,
      createdAt: post.created_time
    });
  }

/* show video page */
  showVideos(video){
    this.navCtrl.push(showVideosPage, {
      imageUrl: video.snippet.thumbnails.default.url,
      title: video.snippet.title,
      description: video.snippet.description,
      time: video.snippet.publishedAt,
      videoId: video.id.videoId
    });
  }
}

