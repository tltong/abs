import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PhoneServiceProvider {

  constructor(private toastCtrl: ToastController,private alertCtrl: AlertController) {

  }

  presentAlert(title,subtitle,button) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: subtitle,
    buttons: [button]
  });
  alert.present();
}


  // Toast
  presentToast(msg:string) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
  });

  toast.present();
}

}
