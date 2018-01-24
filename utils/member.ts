export class Member {
  name: string;
  gender: string;
  japnative: string;
  organiser: string;
  id:string; 

  constructor(name, gender, japnative, organiser){
    this.name=name;
    this.gender=gender;    
    this.japnative=japnative;
    this.organiser=organiser;
  }
    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}

