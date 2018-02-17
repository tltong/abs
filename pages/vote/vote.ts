import { Component } from '@angular/core';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../utils/member'

@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage implements OnDestroy{

  memberForm: FormGroup;
  collectionName="abs-members";
  membersDisplayJapSpeakers:Array<any>;
  membersDisplayEnglishSpeakers:Array<any>;
  membersDisplayAll:Array<any>;

  members$: Observable<any[]>;
  $members: ISubscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ds:DataServiceProvider, public ps:PhoneServiceProvider,
              public formBuilder: FormBuilder) {
  
      this.memberForm = formBuilder.group({
      nameJapaneseSpeaker: ['', Validators.compose([Validators.required])],
      nameEnglishSpeaker: ['', Validators.compose([Validators.required])],
      nameEntertainingSpeaker: ['', Validators.compose([Validators.required])]
    });


  }

  formSubmit() {
    var update;
    var members$: Observable<any[]>;
    var $members: ISubscription;  
    var member:Member;

    update=1;
    //best japanese speaker  

    members$=this.ds.pullDataSnapshotChangesFS(this.collectionName);

    $members=members$.subscribe(queriedItems => {
      if (update==1) {
        if (queriedItems.length > 0) {
          for (let i=0;i<queriedItems.length;i++) {
            if (queriedItems[i].docID==this.memberForm.value.nameJapaneseSpeaker){
              member = new Member(queriedItems[i].name,queriedItems[i].gender,
                           queriedItems[i].japnative,queriedItems[i].organiser,
                           queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,
                           queriedItems[i].hobby);
              member.update("docID",queriedItems[i].id);
              member.setgroupID(queriedItems[i].groupID);
              for (let j=0;j<queriedItems[i].voteJapaneseSpeaker;j++) { member.castVoteJapaneseSpeaker(); }    
              for (let j=0;j<queriedItems[i].voteEnglishSpeaker;j++) { member.castVoteEnglishSpeaker(); }    
              for (let j=0;j<queriedItems[i].voteEntertainingSpeaker;j++) { member.castVoteEntertainingSpeaker(); }    

              member.castVoteJapaneseSpeaker(); // cast vote

              this.ds.updateDocument(this.collectionName,member.docID,member);
              break;
            }
          } // for loop
          update=0;
       } //if queriedItems.length > 0

      }// if update

    });


//    this.ps.presentToast('best japansese speaker'+this.memberForm.value.nameJapaneseSpeaker);

  }

  ionViewDidLoad() {

    this.members$=this.ds.pullDataSnapshotChangesFS(this.collectionName);
    this.$members=this.members$.subscribe(queriedItems => {
    if (queriedItems.length > 0) {

      this.membersDisplayJapSpeakers = new Array();     
        for (let i=0;i<queriedItems.length;i++) {
          if (queriedItems[i].japnative=="no"){
            this.addMember(this.membersDisplayJapSpeakers,queriedItems[i].name,queriedItems[i].gender,
                           queriedItems[i].japnative,queriedItems[i].organiser,
                           queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,
                           queriedItems[i].hobby,queriedItems[i].id,queriedItems[i].groupID)
           } // if
          } // for loop
      }

      this.membersDisplayEnglishSpeakers = new Array();
        for (let i=0;i<queriedItems.length;i++) {
          if (queriedItems[i].japnative=="yes"){
            this.addMember(this.membersDisplayEnglishSpeakers,queriedItems[i].name,queriedItems[i].gender,
                           queriedItems[i].japnative,queriedItems[i].organiser,
                           queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,
                           queriedItems[i].hobby,queriedItems[i].id,queriedItems[i].groupID);
            } // if
          } // for loop

      this.membersDisplayAll = new Array();
        for (let i=0;i<queriedItems.length;i++) {
          this.addMember(this.membersDisplayAll,queriedItems[i].name,queriedItems[i].gender,
                         queriedItems[i].japnative,queriedItems[i].organiser,
                         queriedItems[i].fluentjapanese,queriedItems[i].fluentenglish,
                         queriedItems[i].hobby,queriedItems[i].id,queriedItems[i].groupID);
        }
      });

  }

  addMember(memberArray:Array<any>,name,gender,japnative,organiser,fluentjapanese,
            fluentenglish,hobby,docID,groupID) {
    var member = new Member(name,gender,japnative,organiser,fluentjapanese,fluentenglish,hobby);
    member.update("docID",docID);
    member.setgroupID(groupID);
    memberArray.push(member);
  }

  ngOnDestroy() {
    this.$members.unsubscribe();
  }


}
