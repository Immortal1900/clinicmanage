import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable, Query, OnInit } from '@angular/core';
import { patient } from './shared/patient' 
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database"
import {AngularFirestore}from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
  
})


export class PatientService implements OnInit {
  //patients:patient[]=new Array;
  patientdata:FormGroup;
  emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  nowDate = new Date(); 
  date =this.nowDate.getDate()+'/'+(this.nowDate.getMonth()+1)+'/'+ this.nowDate.getFullYear(); 
  constructor(public afs: AngularFirestore,private titlecasePipe:TitleCasePipe,public fb:FormBuilder) { 
    this.patientdata = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      gen: ['', [Validators.required]],     
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]     
        })
  }
  onSubmit(ap:FormGroup)
  {
    console.log(ap.value.name);
    ap.value.name=this.titlecasePipe.transform(ap.value.name);
    var nowDate = new Date(); 
    var date =nowDate.getDate()+'/'+(nowDate.getMonth()+1)+'/'+ nowDate.getFullYear(); 
    console.log(ap.value.name);
    console.log("Submitted"); 
    var newDocRef = firebase.firestore().collection('Patients').doc();
    newDocRef.set({
      pid:newDocRef.id,
      name:ap.value.name,
      phno:ap.value.phno,
      email:ap.value.email,
      age:ap.value.age,
      address:ap.value.address,
      gender:ap.value.gen,
      lastvisit:this.date
      
    }).then(()=>{      
      console.log("Sent")
    }).catch((err)=>{console.log("err")});
     ap.reset();
  }
  pat;
async getpatients(pid){
  await firebase.firestore().collection("Patients").doc(pid)
    .get()
    .then((doc)=>{
      this.pat=doc.data();
      console.log(doc.data());
      console.log(this.pat)
      console.log(this.pat.name);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    this.patientdata.setValue({
      name:this.pat.name,
      email:this.pat.email,
      address:this.pat.address,
      age:this.pat.age,
      phno:this.pat.phno,
      gen:this.pat.gender
    })
  }

  async updatepatient(ap,pid){
    var newDocRef = firebase.firestore().collection('Patients').doc(pid);
    newDocRef.set({
      pid:newDocRef.id,
      name:ap.value.name,
      phno:ap.value.phno,
      email:ap.value.email,
      age:ap.value.age,
      address:ap.value.address,
      gender:ap.value.gen,
      lastvisit:this.date 
    }).then(()=>{      
      console.log("Sent")
    }).catch((err)=>{console.log("err")});
  }
     /*
await firebase.firestore().collection("Patients") .orderBy("name", "desc").get().then((querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
   // console.log(doc.id,"=>",doc.data());
    this.patients.push({
      id:doc.id,
      name:doc.data().name,
      phno:doc.data().phno,
      email:doc.data().email,
      age:doc.data().age,
      address:doc.data().address,
      gen:doc.data().gender
    });
    
  })
})
  */
 searchValue: string = "";
 result;
 found;
  searcha() {
    this.found=false;
    console.log("asdasd"+this.searchValue);
    let self = this;
    self.result = self.afs.collection(`Patients`, ref => ref
      .orderBy("name")
      .startAt(self.searchValue)
      .endAt(self.searchValue+"\uf8ff")
      .limit(10)
      )
      .valueChanges();
      this.result.subscribe(result => {
        this.found=result.length;
        console.log(result);
        console.log(result.length)});
  
  if(this.result==null){
    this.found=true;
    console.log("FOUND NOT NULL")
  }
  }



ngOnInit(){

}
}

