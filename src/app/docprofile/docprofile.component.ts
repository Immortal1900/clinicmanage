import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docprofile',
  templateUrl: './docprofile.component.html',
  styleUrls: ['./docprofile.component.css']
})
export class DocprofileComponent implements OnInit {
  avatar ="../../assets/avatar.png";
  constructor(public doctorService:DoctorService) { }

  ngOnInit(): void {

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
    this.doctorService.imageupdated=true;
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

}
