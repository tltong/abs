
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '../../utils/member'

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  tb_pplgroup:number;
  id:string;
  collectionName:string;    
  pplgroup_count:number;  
  test_string:string;  
  members:Observable<any[]>;
  membersDisplay:Array<any>;

  memberForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public ds:DataServiceProvider,public ps:PhoneServiceProvider,public formBuilder: FormBuilder) {
    this.collectionName = "abs-members";

    this.memberForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      gender: ['',Validators.compose([Validators.required])],
      japnative: ['',Validators.compose([Validators.required])],
      organiser: ['',Validators.compose([Validators.required])],
      fluentjapanese: ['',Validators.compose([Validators.required])],
      fluentenglish: ['',Validators.compose([Validators.required])],
      hobby: ['',Validators.compose([Validators.required])],
      groupID: [''],
      docID: ['',Validators.compose([Validators.required])]

    });
  }


  showMember(name:string,gender:string,japnative:string,organiser:string,fluentjapanese,fluentenglish,hobby,groupID,docID) {

    this.memberForm.reset();
    this.memberForm.get('name').setValue(name);    
    this.memberForm.get('gender').setValue(gender);
    this.memberForm.get('japnative').setValue(japnative);
    this.memberForm.get('organiser').setValue(organiser);
    this.memberForm.get('fluentjapanese').setValue(fluentjapanese);
    this.memberForm.get('fluentenglish').setValue(fluentenglish);
    this.memberForm.get('hobby').setValue(hobby);
    this.memberForm.get('groupID').setValue(groupID);
    this.memberForm.get('docID').setValue(docID);
  }


  test() {
    this.ps.presentConfirm('Alert','Are you sure?').then( ()=> { this.ps.presentToast("ok");  } );
  }

  formDelete() {
    this.ps.presentConfirm('Alert','Delete user?').then( ()=> { 
      this.ds.deleteDocument(this.collectionName,this.memberForm.value.docID);  
      this.memberForm.reset();
    } );
  }

  formSubmit() {
    this.ps.presentConfirm('Alert','Update member details?').then( ()=> { 
      var member:Member;
      member = new Member(this.memberForm.value.name,this.memberForm.value.gender,
                        this.memberForm.value.japnative,this.memberForm.value.organiser,
                        this.memberForm.value.fluentjapanese,this.memberForm.value.fluentenglish,this.memberForm.value.hobby);

      if (this.memberForm.value.groupID != null) {
        member.setgroupID(Number(this.memberForm.value.groupID));
      }
      this.ds.updateDocument(this.collectionName,this.memberForm.value.docID,member);

    });
  }


  refresh() {
    var members:Observable<any[]>;
    var member:Member;
    var i:number=0;
    var memberArray:Member[];
    
    var update=1;   

    members = this.ds.pullDataSnapshotChangesFS(this.collectionName);
    members.subscribe(
      queriedItems => {   

        if (update==1)
        {
          this.pplgroup_count=1;
  /*
        // assign organisers
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].organiser=="yes"){
              this.addMember(memberArray,queriedItems[i].name,queriedItems[i].gender,queriedItems[i].japnative,queriedItems[i].organiser,queriedItems[i].id);
            } // if
          } // for loop
         this.assignGroupID(this.collectionName,memberArray);
*/
          // assign female japnative
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="female" && queriedItems[i].japnative=="yes"){
             this.addMember(memberArray,queriedItems[i].name,queriedItems[i].gender,
                             queriedItems[i].japnative,queriedItems[i].organiser,
                             queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,queriedItems[i].hobby,
                             queriedItems[i].id);
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

         // assign female local
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="female" && queriedItems[i].japnative=="no"){
             this.addMember(memberArray,queriedItems[i].name,queriedItems[i].gender,
                             queriedItems[i].japnative,queriedItems[i].organiser,
                             queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,queriedItems[i].hobby,
                             queriedItems[i].id);
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

         // assign male japanese
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="male" && queriedItems[i].japnative=="yes"){
              this.addMember(memberArray,queriedItems[i].name,queriedItems[i].gender,
                             queriedItems[i].japnative,queriedItems[i].organiser,
                             queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,queriedItems[i].hobby,
                             queriedItems[i].id);
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

         // assign male local 
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="male" && queriedItems[i].japnative=="no"){
              this.addMember(memberArray,queriedItems[i].name,queriedItems[i].gender,
                             queriedItems[i].japnative,queriedItems[i].organiser,
                             queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,queriedItems[i].hobby,
                             queriedItems[i].id);
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

        update=0;   
        } // if update
      } // queriedItems
    ); // subscribe
  } //refresh()

  addMember(memberArray:Array<any>,name,gender,japnative,organiser,fluentjapanese,fluentenglish,hobby,docID) {
    var member = new Member(name,gender,japnative,organiser,fluentjapanese,fluentenglish,hobby);
    member.update("docID",docID);
    memberArray.push(member);
  }

  private assignGroupID(collectionName:string,memberArray:Array<any>) {
    memberArray = this.ds.randomiseArray(memberArray);
    for (var i=0;i<memberArray.length;i++){
      memberArray[i].setgroupID(this.pplgroup_count);
      this.ds.updateDocument(collectionName,memberArray[i].docID,memberArray[i]);
      this.pplgroup_count++;
      if (this.pplgroup_count>this.tb_pplgroup){   this.pplgroup_count=1;  }
    }
//    this.test_string="name:" + memberArray[0].name + "group id:" + memberArray[0].groupID;
  } // assignGroupID

  ionViewDidLoad() {
    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
    this.members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.membersDisplay = this.ds.sortArray(queriedItems,"groupID");
      }
      });
  }
}
