import { TitleCasePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';
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
  constructor(public afs: AngularFirestore,private titlecasePipe:TitleCasePipe) { }
  onSubmit(ap:FormGroup)
  {
    console.log(ap.value.name);
    ap.value.name=this.titlecasePipe.transform(ap.value.name);
    
    console.log(ap.value.name);
    console.log("Submitted"); 
    firebase.firestore().collection("Patients").doc().set({
      name:ap.value.name,
      phno:ap.value.phno,
      email:ap.value.email,
      age:ap.value.age,
      address:ap.value.address,
      gender:ap.value.gen
    }).then(()=>{      
      console.log("Sent")
    }).catch((err)=>{console.log("err")});
     ap.reset();
  }
async getpatients(){
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
  }
   
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
      .limit(10))
      .valueChanges();
     
      
      this.result.subscribe(result => {
        this.found=result.length;
        console.log(result.length)});
  
  if(this.result==null){
    this.found=true;
    console.log("FOUND NOT NULL")
  }
  }



ngOnInit(){

}
}

