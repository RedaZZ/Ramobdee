import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor ( private http: Http, public navCtrl: NavController) {
    this.actu = "news";
    this.posts = this.retrieveFacebookData();
    this.videos = this.retrieveYoutubeData();

  }

  getFacebookData() {
    var access_token = "EAABolGQ2JQEBAGG1MtGRjYAL56QpUpCZBoSFXjMAxk3OtfZCncWVZAHZBN2As0aeK9NcjIKBwDRsPIZATntcmXQob7D5leOHOmKam3E4IIcOOICqZA56KWbnHRXfnAq65btB0YXZBZAV0WtEMV6bvwaChymlBEpuUzpUCcXMVCSZBFUmLLypWxVXS";
    return this.posts = this.http.get("https://graph.facebook.com/v2.8/811425755690421/feed?fields=id,created_time,message,link,full_picture&access_token="+access_token).map((res:Response) => res.json());
  }

  retrieveFacebookData() {
    return this.getFacebookData().subscribe(val => this.posts = val);
  }

  getYoutubeData() {
    return this.videos = this.http.get("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCFl5dUovd_Wr1AT0aprFAJA&maxResults=25&key=AIzaSyAfFF-Db5ZxfDqUXOmle5bDy9cORUcaPGg").map((res:Response) => res.json());
  }

  retrieveYoutubeData() {
    return this.getYoutubeData().subscribe(val => this.videos = val);
  }

  /* Show News Page*/
  showNews(post){
    this.navCtrl.push(showNewsPage, {
      message: post.message,
      publicUrl: post.full_picture,
      createdAt: post.created_time
    });
  }

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

