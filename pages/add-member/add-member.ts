import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

import { Member } from '../../utils/member'

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  tb_name: string;
  gender: string;
  japnative: string;
  organiser: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ps:PhoneServiceProvider
  ,public ds:DataServiceProvider) {
  }

  submit() {
    var member: Member;
    member = new Member(this.tb_name,this.gender,this.japnative,this.organiser); 
    this.ds.pushDataFS("abs-members",member);
    this.navCtrl.pop();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

}
