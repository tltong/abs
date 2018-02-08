import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class PhoneServiceProvider {

  constructor(private toastCtrl: ToastController,private alertCtrl: AlertController) {

  }

  //prompt
presentPrompt(inTitle,inUsername,inPassword,
verifyPW:(inPassword:string)=>boolean):boolean {
  let alert = this.alertCtrl.create({
    title: inTitle,
    inputs: [
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
        return verifyPW(data.password);
        }
      }
    ]
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
