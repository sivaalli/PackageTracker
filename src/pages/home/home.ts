import {Component} from '@angular/core';

import {NavController, LoadingController, AlertController} from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {Camera, CameraOptions} from 'ionic-native'
import {OcrService} from "../../providers/ocr-service";
import {TrackingService} from "../../providers/tracking-service";
import {TrackingDetailsPage} from "../tracking-details/tracking-details";
import {Tracking} from "./tracking";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public trackingNumber: string;
    public parsedData:string;
    public tracking:Tracking;
    public carrier:string;
    public trackingNumberList:Array<String>;
    //to be deleted


    constructor(public alertCtrl: AlertController, public navCtrl: NavController, private http: Http, public loadingCtrl: LoadingController, private ocrService: OcrService, private trackingService: TrackingService) {

    }

    presentLoading() {
        let loading = this.loadingCtrl.create({
            content: 'Please wait while we retrieve data from picture'
        });
        return loading;
    }

    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'Could no find Tracking number, please try again',
            buttons: ['Ok']
        });
        alert.present();
    }

    takePicture(source: number) {

        let options: CameraOptions;
        options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            targetWidth: 1000,
            targetHeight: 1000
        }

        Camera.getPicture(options).then((imageData: string) => {
            this.trackingNumber = null;
            let loading = this.presentLoading();
            loading.present();
            this.ocrService.postImage(imageData).subscribe(
                (data: any) => {
                    let imageData: string;
                    imageData = data.json().ParsedResults[0].ParsedText.replace(/ /g,'');
                    this.parsedData = imageData;
                    this.tracking = this.parseTrackingNumber(imageData,this.carrier);
                    this.trackingNumber = this.tracking.tracking_number;
                    loading.dismiss();
                    if (this.tracking == null) {
                        this.showAlert();
                    }

                }
            );

        }, (err) => {

        });
    }

    parseTrackingNumber(data: string,carrier:string) {
        let trackingNumber: string;
        //Fedex tracking regex
        let trackingData: any;

        if(carrier==="ups"){
          //UPS tracking regex
          trackingData = data.match(/(1Z[a-zA-Z0-9]{16})|(\d{12})|(T\d{10})|(\d{9})/);
          if (trackingData) {
            this.trackingNumberList = trackingData;
            trackingNumber = trackingData[0];
            return new Tracking('ups',trackingNumber);
          }
        }else if(carrier==="usps"){
          //USPS tracking regex
          trackingData = data.match(/(9\d{21})|((EA|EC|CP|RA)\d{9}US)|(82\d{8})/);
          if (trackingData) {
            this.trackingNumberList = trackingData;
            trackingNumber = trackingData[0];
            return new Tracking('usps',trackingNumber);
          }
        }else if(carrier==="fedex"){
          trackingData = data.match(/\d{12,19}/);
          if (trackingData) {
            this.trackingNumberList = trackingData;
            trackingNumber = trackingData[0];
            return new Tracking('fedex',trackingNumber);
          }
        }else{
          return null;
        }

    }

    trackPackage() {
        this.trackingService.trackPackage(this.tracking.carrier,this.tracking.tracking_number).subscribe(
            (data:Response) => {
                let trackingDetails:any = data.json();
                this.navCtrl.push(TrackingDetailsPage,{
                    trackingDetails:trackingDetails
                });
            }
        );
    }

}
