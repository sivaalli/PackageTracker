import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {HttpModule} from "@angular/http";
import {OcrService} from "../providers/ocr-service";
import {TrackingService} from "../providers/tracking-service";
import {TrackingDetailsPage} from "../pages/tracking-details/tracking-details";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TrackingDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TrackingDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},OcrService,TrackingService]
})
export class AppModule {}
