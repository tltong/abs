export class Members {
  name: string;
  gender: string;
  nativejap: string;
  organiser: string;

  constructor(name, gender, nativejap, organiser){
    this.name=name;
    this.gender=gender;    
    this.nativejap=nativejap;
    this.organiser=organiser;
  }
    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }
}

