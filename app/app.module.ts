import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { PhoneServiceProvider } from '../providers/phone-service/phone-service';
import { MemberProvider } from '../providers/member/member';

export const firebaseConfig = {
    apiKey: "AIzaSyAio_94Pw0FrTLCLAAh3-8oY45AN9m0bbg",
    authDomain: "whiteknight-9f398.firebaseapp.com",
    databaseURL: "https://whiteknight-9f398.firebaseio.com",
    projectId: "whiteknight-9f398",
    storageBucket: "whiteknight-9f398.appspot.com",
    messagingSenderId: "703289580337"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    PhoneServiceProvider,
    MemberProvider
  ]
})
export class AppModule {}
