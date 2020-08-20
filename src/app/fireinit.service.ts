import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FireinitService {

  constructor() { }

  initfirebase(){
    firebase.initializeApp(environment.firebase)
    console.log("Firebase Connected");
  }
}
