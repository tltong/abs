export class Member {
  name: string;
  gender: string;
  japnative: string;
  organiser: string;
  groupID:string; 

  constructor(name, gender, japnative, organiser){
    this.name=name;
    this.gender=gender;    
    this.japnative=japnative;
    this.organiser=organiser;
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
      case "groupID": {
        this.groupID=fieldValue;        
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

