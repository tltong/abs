import { Component } from '@angular/core';
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  members$: Observable;
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
