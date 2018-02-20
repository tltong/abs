import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Member } from '../../utils/member';
import { DataServiceProvider } from '../data-service/data-service';
import { PhoneServiceProvider } from '../phone-service/phone-service';

@Injectable()
export class MemberProvider {

  constructor(public ds:DataServiceProvider,public ps:PhoneServiceProvider) {
  }


  public constructMemberRaw(name:string,gender:string,japnative:string,organiser:string,
    fluentjapanese:string,fluentenglish:string,hobby:string,groupID:number,docID:string,
    voteJapaneseSpeaker:number,public voteEnglishSpeaker:number,voteEntertainingSpeaker:number):Member {

    var member:Member; 
    member = new Member(name,gender,
                        japnative,organiser,
                        fluentjapanese,fluentenglish,
                        hobby);
    member.update("docID",docID);
    if (groupID != null) { member.setgroupID(groupID) };
    for (let j=0;j<voteJapaneseSpeaker;j++) { member.castVoteJapaneseSpeaker(); }
    for (let j=0;j<voteEnglishSpeaker;j++) { member.castVoteEnglishSpeaker(); }
    for (let j=0;j<voteEntertainingSpeaker;j++) { member.castVoteEntertainingSpeaker(); }
    return member;

  }

  public constructMember(item:any):Member {
    var member:Member;
    member = new Member(item.name,item.gender,
                        item.japnative,item.organiser,
                        item.fluentjapanese,item.fluentenglish,
                        item.hobby);
    member.update("docID",item.id);
    member.setgroupID(item.groupID);
    for (let j=0;j<item.voteJapaneseSpeaker;j++) { member.castVoteJapaneseSpeaker(); }
    for (let j=0;j<item.voteEnglishSpeaker;j++) { member.castVoteEnglishSpeaker(); }
    for (let j=0;j<item.voteEntertainingSpeaker;j++) { member.castVoteEntertainingSpeaker(); }
    return member;
  }

}
