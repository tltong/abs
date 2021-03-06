export class Member {
  public name: string;
  public gender: string;
  public japnative: string;
  public organiser: string;
  public fluentjapanese: string;
  public fluentenglish: string;
  public hobby: string;
  public groupID:number; 
  public docID:string;
  public voteJapaneseSpeaker:number;
  public voteEnglishSpeaker:number;
  public voteEntertainingSpeaker:number;



  constructor(name, gender, japnative, organiser, fluentjapanese, fluentenglish, hobby){
    this.name=name;
    this.gender=gender;    
    this.japnative=japnative;
    this.organiser=organiser;
    this.fluentjapanese=fluentjapanese;
    this.fluentenglish=fluentenglish;
    this.hobby=hobby;

    this.voteJapaneseSpeaker = 0;
    this.voteEnglishSpeaker = 0;
    this.voteEntertainingSpeaker = 0;

  }

  clearAllVotes() {
    this.voteJapaneseSpeaker = 0;
    this.voteEnglishSpeaker = 0;
    this.voteEntertainingSpeaker = 0;
  }

  castVoteJapaneseSpeaker() {
    this.voteJapaneseSpeaker++;
  }

  castVoteEnglishSpeaker() {
    this.voteEnglishSpeaker++;
  }

  castVoteEntertainingSpeaker() {
    this.voteEntertainingSpeaker++;
  }


  setgroupID(id:number) {
    this.groupID=id;
  }

  update(fieldName:string, fieldValue:string) {
    switch(fieldName) {
      case "name": {
       this.name=fieldValue;
       break;    
      }
      case "gender": {
        this.gender=fieldValue;
        break;
      }
      case "japnative": {
        this.japnative=fieldValue;
        break;
      }
      case "organiser": {
        this.organiser==fieldValue;
        break;
      }
      case "docID": {
        this.docID=fieldValue;
        break;
      }
   }
  }



    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}

