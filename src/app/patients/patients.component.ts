import { patient } from './../shared/patient';

import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {PatientService} from '../patient.service';
import { Subject ,Observable} from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  
})
export class PatientsComponent implements OnInit {
  startAt=new Subject();
  endAt=new Subject();
  addpatient:FormGroup;
  patientdata:FormGroup;
  patient=[1,2,3,4,5,6];
  emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  Object = Object;
  constructor(config: NgbModalConfig, private modalService: NgbModal,public fb: FormBuilder,public patientService: PatientService,) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.addpatient = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      gen: ['', [Validators.required]],     
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]     
        })
      
  }


  open(content) {
    this.modalService.open(content);
  }
  open1(content,pid){
    this.patientService.getpatients(pid);
    this.modalService.open(content);
  }
  movies;
  ngOnInit(): void {
    this.patientService.searcha();
    //this.patientService.getpatients();
  

    
  }




}
