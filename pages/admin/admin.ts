
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
  participantNo:number;
  organiserNo:number;
  tb_pplgroup:number;
  id:string;
  collectionName:string;    
  
  test_string:string;  
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
  } // delete()

  refresh() {
    var members:Observable<any[]>;
    var member:Member;
    var i:number=0;
    var pplgroup_count=1;
    var memberArray:Member[];
    
    this.participantNo=0;
    this.organiserNo=0;
    var update=1;   

    members = this.ds.pullDataSnapshotChangesFS(this.collectionName);

    members.subscribe(

      queriedItems => {   

        if (update==1)
        {
          this.participantNo=0;
          this.organiserNo=0;
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            this.participantNo++;
              if (queriedItems[i].organiser=="yes"){
                this.organiserNo++;
                member = new Member(queriedItems[i].name,queriedItems[i].gender,queriedItems[i].japnative
                ,queriedItems[i].organiser);
                member.update("docID",queriedItems[i].id);
                memberArray.push(member);
                pplgroup_count++;
                if (pplgroup_count>this.tb_pplgroup){   pplgroup_count=1;  }
              } // if
          } // for loop
          update=0;
          pplgroup_count=1;     
          memberArray = this.ds.randomiseArray(memberArray);
          for (i=0;i<memberArray.length;i++){
            memberArray[i].update("groupID",String(pplgroup_count));
            this.ds.updateDocument(this.collectionName,memberArray[i].docID,memberArray[i]);
            pplgroup_count++;
            if (pplgroup_count>this.tb_pplgroup){   pplgroup_count=1;  }
          }
        }
      } // queriedItems
    ); // subscribe
  } //refresh()



  ionViewDidLoad() {
    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
  }


}
