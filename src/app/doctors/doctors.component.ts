
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {DoctorService}  from '../doctor.service';
declare var require: any;
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers:[NgbModal]
})
export class DoctorsComponent implements OnInit {
  docprofile:boolean=false;
  loaddocprofile(){
    this.docprofile=true;
  }
avatar ="../../assets/avatar.png";
adddoctor:FormGroup;
imageselected:boolean=false;
emailPattern="(^$|^.*@.*\..*$)";
phnopattern="[0-9]{10}";

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal, private modalService: NgbModal,private fb:FormBuilder,public doctorService:DoctorService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.imageselected=false;
    this.adddoctor = this.fb.group({
      name: ['', [Validators.required]], 
      email: ['',[Validators.pattern(this.emailPattern)]],
      phno:['', [Validators.required, Validators.pattern(this.phnopattern)]],
      gen: ['', [Validators.required]],     
      age: ['', [Validators.required]],
      address: ['', [Validators.required]]     
        })
  }
  


  openXl(content) {
    this.modalService.open(content, { size: 'xl' });
  }
  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.imageselected=true;
    //this.doctorService.selectedFile = new Blob([files], { type: "image/jpeg" });
    this.doctorService.selectedFile =files[0];
    console.log(this.doctorService.selectedFile)
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  async submit(ap:FormGroup){
    await this.doctorService.onSubmit(ap);
    this.modalService.dismissAll('Dismissed after saving data');
  }



  ngOnInit(): void {
    this.doctorService.getalldoctors();
  }

}
