import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TrackingService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrackingService {

  constructor(public http: Http) {

  }

  trackPackage(carrier:string,tracking_number:string){
      let headers = new Headers();
      headers.append("Authorization","ShippoToken shippo_live_85f0d98db5b253f8b6f4d6bc4e05ab4b06b3b218");
      headers.append("Content-Type","application/json");
      return this.http.get("https://api.goshippo.com/tracks/"+carrier+"/"+tracking_number,{headers:headers});
  }
}
