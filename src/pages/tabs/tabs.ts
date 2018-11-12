import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { GroupsPage } from '../groups/groups';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GroupsPage;
  tab2Root = SettingsPage;


  constructor() {

  }
}
