import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserselectionPage } from './userselection';

@NgModule({
  declarations: [
    UserselectionPage,
  ],
  imports: [
    IonicPageModule.forChild(UserselectionPage),
  ],
})
export class UserselectionPageModule {}
