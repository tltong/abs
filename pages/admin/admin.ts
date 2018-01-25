import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

import { Member } from '../../utils/member'

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  tb_name:string;
  id:string;
  collectionName:string;    

  members:Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public ds:DataServiceProvider,public ps:PhoneServiceProvider) {
    this.collectionName = "abs-members";
  }

  delete() {

    this.members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.id = queriedItems[0].id;
      }else {
        this.id = "not found";
      }
   });


/*
    this.members.subscribe(queriedItems => {
       this.id = "hwew";
      for (item in queriedItems){
        if (item.name == this.tb_name) {
          this.id = item.id;
          break;    
        }
      }      

    });
*/

/*
    var members:Observable<any[]>;
    members = this.ds.pullDataSnapshotChangesFSSimpleQuery(this.collectionName,"name",this.tb_name);
    members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.id = queriedItems[0].id;
      }else {
        this.id = "not found";
      }

   });
*/
  }

  ionViewDidLoad() {
    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
  }

}
