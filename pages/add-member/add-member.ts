import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

/**
 * Generated class for the AddMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  tb_name: string;
  gender: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ps:PhoneServiceProvider) {
  }


  submit() {
 
    this.ps.presentToast(this.gender);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

}
