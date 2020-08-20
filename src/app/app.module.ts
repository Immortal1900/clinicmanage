import { TitleCasePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFirestore,AngularFirestoreModule} from '@angular/fire/firestore';
import { Routes, RouterModule } from "@angular/router";
import { environment } from '../environments/environment';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientsComponent } from './patients/patients.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DocprofileComponent } from './docprofile/docprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    PatientsComponent,
    DoctorsComponent,
    DocprofileComponent,
  
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
   
    AngularFireModule.initializeApp(environment.firebase),

    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  
    AngularFirestoreModule,
    
  ],
  providers: [TitleCasePipe,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
