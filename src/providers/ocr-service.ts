import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OcrService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OcrService {

  constructor(public http: Http) {}

  postImage(data:string){
    data = "data:image/jpeg;base64," + data;
    data = "apikey=5f4ed0311688957&base64Image=" + encodeURIComponent(data);
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post("https://api.ocr.space/parse/image",data,{headers:headers});
  }

}
