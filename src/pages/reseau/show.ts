import { Component,  ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-show',
  templateUrl: 'show-data.html'
})

export class showDataPage{
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  public name;
  public adress;
  public tel;
  public kind;
  public lat;
  public lng;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation){

    this.name = navParams.get("name");
    this.tel = navParams.get("tel");
    this.adress = navParams.get("adress");
    this.kind = navParams.get("kind");
    this.lat = navParams.get("lat");
    this.lng = navParams.get("lng");

  }

  goBack() {
    console.log("popping");
    this.navCtrl.pop();
  }

  ionViewDidLoad(){
    if (this.kind === "Agence") {
      this.loadMap();
    }
  }

  loadMap(){
    let directionsDisplay = new google.maps.DirectionsRenderer();

    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    directionsDisplay.setMap(this.map);

    var infowindow = new google.maps.InfoWindow({
      content: this.adress
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.map,marker);
    });

  }

  addMarker(){
    var options = {
      /*maximumAge: 3000, timeout: 5000,*/ enableHighAccuracy: false
    };
    let directionsService = new google.maps.DirectionsService();

    this.geolocation.watchPosition(options).subscribe((position) => {
      let directionsDisplay = new google.maps.DirectionsRenderer();

      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      directionsDisplay.setMap(this.map);
      var end = new google.maps.LatLng(this.lat, this.lng);
      var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
      };

      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        } else {
          alert("couldn't get directions:" + status);
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

 startNavigating(){

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      var options = {
        maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
      };
      this.geolocation.watchPosition(options).subscribe((position) => {
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: {lat: Number(this.lat), lng: Number(this.lng)},
            destination: {lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)},
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {

            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }

        });
        }, (err) => {
        console.log(err);
      });


/*    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latLng = new google.maps.LatLng(this.lat, this.lng);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);

        directionsService.route({
            origin: {lat: Number(this.lat), lng: Number(this.lng)},
            destination: {lat: Number(position.coords.latitude), lng: Number(position.coords.longitude)},
            travelMode: google.maps.TravelMode['DRIVING']
        }, (res, status) => {
          if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(res);
          } else {
            console.warn(status);
          }
        });
      }, Error => {
        console.log(Error);
      })
    }*/
  }
}


