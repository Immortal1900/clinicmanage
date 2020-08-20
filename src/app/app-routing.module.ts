import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import {DocprofileComponent} from './docprofile/docprofile.component'
const routes:Routes=  
[{ path: '', component:DoctorsComponent },
  {path:'docprofile',component:DocprofileComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
