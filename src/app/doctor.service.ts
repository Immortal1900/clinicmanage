import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database"
import {AngularFirestore}from '@angular/fire/firestore';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {doctor} from './shared/doctor'
@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  selectedFile: File;
  profileurl;
  docRef;
  emailPattern="(^$|^.*@.*\..*$)";
  phnopattern="[0-9]{10}";
  constructor(private titlecasePipe:TitleCasePipe,private afStorage:AngularFireStorage,public fb:FormBuilder) {
    this.doctordataform = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      address:[''],
 
        })
   }
  ngOnInit(): void {
    this.onSubmit
  }
  imagerefid;
  async onSubmit(ap:FormGroup)
  {
console.log(this.selectedFile);
this.imagerefid = Math.random().toString(36).substring(2);
const fileRef:AngularFireStorageReference=this.afStorage.ref("Doctors").child(this.imagerefid);
const task: AngularFireUploadTask =fileRef.put(this.selectedFile);
 task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
          this.profileurl=downloadURL;
            console.log(downloadURL);
            this.uploadform(ap);
        });
  })
)
.subscribe();
  }
  uploadform(ap:FormGroup){
    console.log(ap.value.name);
    ap.value.name=this.titlecasePipe.transform(ap.value.name);
    var nowDate = new Date(); 
    var date =nowDate.getDate()+'/'+(nowDate.getMonth()+1)+'/'+ nowDate.getFullYear(); 
    console.log(ap.value.name);
    console.log("Submitted"); 
    var newDocRef = firebase.firestore().collection('Doctors').doc();
    this.docRef=newDocRef.id;
    console.log("profile URL"+this.profileurl);
    newDocRef.set({
      imagerefid:this.imagerefid,
      did:newDocRef.id,
      name:ap.value.name,
      phno:ap.value.phno,
      email:ap.value.email,
      age:ap.value.age,
      address:ap.value.address,
      gender:ap.value.gen,
      lastupdated:date,
      profileicon:this.profileurl    
    }).then(()=>{      
      console.log("Sent")
    }).catch((err)=>{console.log(err)});
     ap.reset();
  }
  ddoc;


  docs:doctor[]=new Array;
  async getalldoctors(){
    this.docs.length=0;
    await firebase.firestore().collection("Doctors").get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
       // console.log(doc.id,"=>",doc.data());
       this.docs.push({  
        name:doc.data().name,
        phno:doc.data().phno,
        email:doc.data().email,
        lastupdated:doc.data().lastupdated,
        gen:doc.data().gender,
        profileurl:doc.data().profileicon,
        did:doc.data().did,
        address:doc.data().address,
        age:doc.data().age,
        imagerefid:doc.data().imagerefid
      });
      })
    }).catch((er)=>{console.log(er)})
console.log(this.docs);
    }

      doctordataform:FormGroup;
      doctordata:doctor;
      profilefeteched=false;
      avatar =new String("../../assets/avatar.png");
      profileicon=this.avatar;
      index;
      async getdoctor(did){
        this.index= this.docs.findIndex(x => x.did ===did); //Find the doc in docs array
console.log("asdasd");
console.log(this.index);
        
        /*
        console.log(did);
        await firebase.firestore().collection("Doctors").doc(did)
          .get()
          .then((doc)=>{
       this.doctordata=({did:
      
      });
           
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });*/
        
          this.doctordataform.setValue({
            name:this.docs[this.index].name,
            email:this.docs[this.index].email,
            phno:this.docs[this.index].phno,
            address:this.docs[this.index].address

          })
          this.profileicon=this.docs[this.index].profileurl;
       this.doctordata={
        name:this.docs[this.index].name,
        email:this.docs[this.index].email,
        phno:this.docs[this.index].phno,
        address:this.docs[this.index].address,
        gen:this.docs[this.index].gen,  
        did:this.docs[this.index].did,
        age:this.docs[this.index].age,
        profileurl:this.docs[this.index].profileurl,
        lastupdated:this.docs[this.index].lastupdated,
        imagerefid:this.docs[this.index].imagerefid
       };        

    console.log(this.docs[this.index].lastupdated);
    console.log(this.doctordata.lastupdated);
}
imageupdated:boolean=false;
  async updatedocprofile(dp:FormGroup){
    console.log(this.doctordata.imagerefid);
    if(this.imageupdated){
      const id = Math.random().toString(36).substring(2);
const fileRef:AngularFireStorageReference=this.afStorage.ref("Doctors").child(this.doctordata.imagerefid);
const task: AngularFireUploadTask =fileRef.put(this.selectedFile);
    }


  await firebase.firestore().collection('Doctors').doc(this.docs[this.index].did).set({
    name:dp.value.name,
    phno:dp.value.phno,
    email:dp.value.email,
    address:dp.value.address,
  },{merge:true})
 
    
  .then(()=>{      
    console.log("Update SUCCESS")
  }).catch((err)=>{console.log(err)});
}
    
}
