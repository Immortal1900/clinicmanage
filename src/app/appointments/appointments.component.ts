import { PatientService } from './../patient.service';

import { environment } from './../../environments/environment';
import * as firebase from 'firebase/app';
import {NgbModal, ModalDismissReasons, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import 'firebase/firestore';
import { appt } from '../shared/appintment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],

})




export class AppointmentsComponent implements OnInit {

 

 appts:appt[]=new Array;
 constructor(config: NgbModalConfig, private modalService: NgbModal) {
  // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content) {
  this.modalService.open(content);
}

  ngOnInit(): void {
  
  this.getappoints();
  }


  
async getappoints(){

await firebase.firestore().collection("bookappointment") .orderBy("booktimestamp", "desc").get().then((querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
   // console.log(doc.id,"=>",doc.data());
    this.appts.push({
      id:doc.id,
      name:doc.data().name,
      phno:doc.data().phno,
      email:doc.data().email,
      date:doc.data().appointmentdate,
    });
    
  })
})
}

opendialog(){

}
}
