import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',

  templateUrl: 'home.html'
})
export class HomePage {

  members:Observable<any[]>;
  membersDisplay:Array<any>;
  collectionName:string = "abs-members";
  date = Date();

  adminPW:string = "2013";

  constructor(public navCtrl: NavController, public ds:DataServiceProvider, public ps:PhoneServiceProvider,
              private alertCtrl: AlertController) {

  }


  goToAddMemberPage(){
      this.navCtrl.push('AddMemberPage');
  }

  goToAdminPage(){
  let alert = this.alertCtrl.create({
    title: 'Login',
    inputs: [
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
        }
      },
      {
        text: 'Login',
        handler: data => {
        
          if (data.password == this.adminPW) { 
            this.navCtrl.push('AdminPage'); 
            return true;
          }else {
            return false;
          }
        }
      }
    ]
  });
  alert.present();


//     this.ps.presentPrompt('For admins only','dummy','dummy',this.CallBackVerifyPW);
//      {this.navCtrl.push('AdminPage');}
  }

  goToVotePPage() {
    this.navCtrl.push('VotePage');

  }



  ionViewDidLoad() {

    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
    this.members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.membersDisplay = this.ds.sortArray(queriedItems,"groupID");
      }
      });
  }

}
