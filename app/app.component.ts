import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
       firebase.initializeApp({
    apiKey: "AIzaSyAio_94Pw0FrTLCLAAh3-8oY45AN9m0bbg",
    authDomain: "whiteknight-9f398.firebaseapp.com",
    databaseURL: "https://whiteknight-9f398.firebaseio.com",
    projectId: "whiteknight-9f398",
    storageBucket: "whiteknight-9f398.appspot.com",
    messagingSenderId: "703289580337"
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

