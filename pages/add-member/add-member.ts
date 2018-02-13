import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { PhoneServiceProvider } from '../../providers/phone-service/phone-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Member } from '../../utils/member'

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  tb_name: string;
  gender: string;
  japnative: string;
  organiser: string;
  test_string;
  memberForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ps:PhoneServiceProvider
  ,public ds:DataServiceProvider,public formBuilder: FormBuilder) {

    this.memberForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      gender: ['',Validators.compose([Validators.required])],
      japnative: ['',Validators.compose([Validators.required])],
      organiser: ['',Validators.compose([Validators.required])],
      fluentjapanese: ['',Validators.compose([Validators.required])],
      fluentenglish: ['',Validators.compose([Validators.required])],
      hobby: ['',Validators.compose([Validators.required])]
    });


  }

  formSubmit(){

//   this.test_string = this.memberForm.value.name+this.memberForm.value.gender+this.memberForm.value.japnative+this.memberForm.value.organiser;


    var member: Member;
    member = new Member(this.memberForm.value.name,this.memberForm.value.gender,
                        this.memberForm.value.japnative,this.memberForm.value.organiser,
                        this.memberForm.value.fluentjapanese,this.memberForm.value.fluentenglish,this.memberForm.value.hobby); 
    this.ds.pushDataFS("abs-members",member);

    this.memberForm.reset();


//    this.navCtrl.pop();
  }



  ionViewDidLoad() {


    console.log('ionViewDidLoad AddMemberPage');
  }

}
