import { Component, ViewChild} from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  barChart: any;
  lineChart: any;

  constructor(public viewCtrl: ViewController, protected params: NavParams) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
   this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
            labels: this.params.get("labels"),
            datasets: [{
                label: 'Consommation',
                data: this.params.get("data"),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Consommations'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Période'
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: true,
        }
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: this.params.get("labels"),
          datasets: [{
              label: 'Consommation',
              data: this.params.get("data"),
              backgroundColor: 'rgba(255,0,255, 0.2)',
              borderColor: 'rgba(255,0,255, 1)',
              borderWidth: 1,
              fill: false,
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Consommations'
                  }
              }],
              xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Période'
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: true,
      }
    });
  }
}