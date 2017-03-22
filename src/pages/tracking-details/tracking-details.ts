import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TrackingDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tracking-details',
  templateUrl: 'tracking-details.html'
})
export class TrackingDetailsPage{

  public trackingDetails:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trackingDetails = navParams.get('trackingDetails');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingDetailsPage');
  }

}
