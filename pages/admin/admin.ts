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
  tb_field:string;
  tb_value:string;

  id:string;
  collectionName:string;    

  members:Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public ds:DataServiceProvider,public ps:PhoneServiceProvider) {
    this.collectionName = "abs-members";
  }

  update () {
    var members:Observable<any[]>;
    var member:Member;
    members = this.ds.pullDataSnapshotChangesFSSimpleQuery(this.collectionName,"name",this.tb_name);
    members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.id = queriedItems[0].id;
        member = new Member(queriedItems[0].name,queriedItems[0].gender,queriedItems[0].japnative,queriedItems[0].organiser);
        member.update(this.tb_field,this.tb_value);
        this.ds.updateDocument(this.collectionName,this.id,member);
      }else {
        this.id = "not found";
      }
   });


  }




  delete() {

    var members:Observable<any[]>;
    members = this.ds.pullDataSnapshotChangesFSSimpleQuery(this.collectionName,"name",this.tb_name);
    members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.id = queriedItems[0].id;
        this.ds.deleteDocument(this.collectionName,this.id);
      }else {
        this.id = "not found";
      }
   });

  }

  ionViewDidLoad() {
    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
  }

}
