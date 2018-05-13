import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddMemberPage } from '../add-member/add-member';
import { AdminPage } from '../admin/admin';
import { HomePage } from '../home/home';
import { VotePage } from '../vote/vote';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddMemberPage;
  tab3Root = VotePage;
//  tab4Root = AdminPage;

  constructor() {
  }


}
