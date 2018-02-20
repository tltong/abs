import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { MemberProvider } from '../../providers/member/member';


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
  $members: ISubscription;

  membersDisplay:Array<any>;
  memberSelected:Member;
  memberForm: FormGroup;
  membersJapaneseSpeakers:Array<any>;
  membersEnglishSpeakers:Array<any>;
  membersEntertainingSpeakers:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public ds:DataServiceProvider,public ps:PhoneServiceProvider,public formBuilder: FormBuilder,
  public ms:MemberProvider ) {
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
      voteJapaneseSpeaker: [''],
      voteEnglishSpeaker: [''],
      voteEntertainingSpeaker: [''],
      docID: ['',Validators.compose([Validators.required])]

    });
  }


  showMember(name:string,gender:string,japnative:string,organiser:string,fluentjapanese,
             fluentenglish,hobby,groupID,voteJapaneseSpeaker,voteEnglishSpeaker,voteEntertainingSpeaker,docID) {

//    this.memberSelected=this.membersDisplay.find(k => k.docID == docID);

    this.memberSelected = this.ms.constructMember(this.membersDisplay.find(k => k.docID == docID));
//    this.ps.presentToast(voteJapaneseSpeaker);
    this.memberForm.reset();
    this.memberForm.get('name').setValue(name);    
    this.memberForm.get('gender').setValue(gender);
    this.memberForm.get('japnative').setValue(japnative);
    this.memberForm.get('organiser').setValue(organiser);
    this.memberForm.get('fluentjapanese').setValue(fluentjapanese);
    this.memberForm.get('fluentenglish').setValue(fluentenglish);
    this.memberForm.get('hobby').setValue(hobby);
    this.memberForm.get('groupID').setValue(groupID);
    this.memberForm.get('voteJapaneseSpeaker').setValue(voteJapaneseSpeaker);
    this.memberForm.get('voteEnglishSpeaker').setValue(voteEnglishSpeaker);
    this.memberForm.get('voteEntertainingSpeaker').setValue(voteEntertainingSpeaker);

  //  this.memberForm.get('voteEnglishSpeaker').setValue(voteEnglishSpeaker);
    this.memberForm.get('docID').setValue(docID);
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

      member = this.ms.constructMemberRaw(this.memberForm.value.name,this.memberForm.value.gender,
                          this.memberForm.value.japnative,this.memberForm.value.organiser,
                          this.memberForm.value.fluentjapanese,this.memberForm.value.fluentenglish,
                          this.memberForm.value.hobby,Number(this.memberForm.value.groupID),
                          this.memberForm.value.docID,Number(this.memberForm.value.voteJapaneseSpeaker),
                          Number(this.memberForm.value.voteEnglishSpeaker),
                          Number(this.memberForm.value.voteEntertainingSpeaker) );



/*
      member = new Member(this.memberForm.value.name,this.memberForm.value.gender,
                          this.memberForm.value.japnative,this.memberForm.value.organiser,
                          this.memberForm.value.fluentjapanese,this.memberForm.value.fluentenglish,
                          this.memberForm.value.hobby);

      if (this.memberForm.value.groupID != null) {
        member.setgroupID(Number(this.memberForm.value.groupID));
      }
*/
//     this.ps.presentToast(member.groupID);
  //   this.ps.presentToast(member.docID);

      this.ds.updateDocument(this.collectionName,member.docID,member);

    });
  }


  refresh() {
    var members:Observable<any[]>;
    var $members: ISubscription;  

    var member:Member;
    var i:number=0;
    var memberArray:Member[];
    
    var update=1;   

    members = this.ds.pullDataSnapshotChangesFS(this.collectionName);
    $members=members.subscribe(
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
              memberArray.push(this.ms.constructMember(queriedItems[i]));
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);


         // assign female local
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="female" && queriedItems[i].japnative=="no"){
              memberArray.push(this.ms.constructMember(queriedItems[i]));
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

         // assign male japanese
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="male" && queriedItems[i].japnative=="yes"){
              memberArray.push(this.ms.constructMember(queriedItems[i]));
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

         // assign male local 
          memberArray = new Array();
          for (i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].gender=="male" && queriedItems[i].japnative=="no"){
              memberArray.push(this.ms.constructMember(queriedItems[i]));
            } // if
          } // for loop
          this.assignGroupID(this.collectionName,memberArray);

        update=0;   
        $members.unsubscribe();
        } // if update
      } // queriedItems
    ); // subscribe
  } //refresh()

  addMember(memberArray:Array<any>,name,gender,japnative,organiser,fluentjapanese,fluentenglish,hobby,docID) {
//    var member = new Member(name,gender,japnative,organiser,fluentjapanese,fluentenglish,hobby);
  //  member.update("docID",docID);
    var member = this.ms.constructMember(this.memberSelected);

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


  ngOnDestroy() {
    this.$members.unsubscribe();
  }


  ionViewDidLoad() {
    this.members=this.ds.pullDataSnapshotChangesFS(this.collectionName);
    this.$members=this.members.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.membersDisplay = this.ds.sortArray(queriedItems,"groupID");
        this.membersJapaneseSpeakers = new Array();
        this.membersEnglishSpeakers = new Array();
        this.membersEntertainingSpeakers = new Array();

        for (let i=0;i<queriedItems.length;i++){
          if(queriedItems[i].voteJapaneseSpeaker > 0) { this.membersJapaneseSpeakers.push(queriedItems[i]); }
          if(queriedItems[i].voteEnglishSpeaker > 0) { this.membersEnglishSpeakers.push(queriedItems[i]); }
          if(queriedItems[i].voteEntertainingSpeaker > 0) { this.membersEntertainingSpeakers.push(queriedItems[i]); }
 
          this.membersJapaneseSpeakers = this.ds.sortArrayReverse(this.membersJapaneseSpeakers,"voteJapaneseSpeaker");
          this.membersEnglishSpeakers = this.ds.sortArrayReverse(this.membersEnglishSpeakers,"voteEnglishSpeaker");
          this.membersEntertainingSpeakers = this.ds.sortArrayReverse(this.membersEntertainingSpeakers,"voteEntertainingSpeaker");

       }
      }
      });
  }
}
