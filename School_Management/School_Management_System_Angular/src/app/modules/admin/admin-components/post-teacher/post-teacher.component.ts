import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-post-teacher',
  templateUrl: './post-teacher.component.html',
  styleUrl: './post-teacher.component.css'
})
export class PostTeacherComponent {

  validationForm: FormGroup;
  GENDER: string[] = ["Male", "Female", "Not Specified"];
  isSpinning: boolean;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      qualification: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required], // Changed from dob to dateOfBirth
    });
  }

  postTeacher() {
    console.log(this.validationForm.value);
    this.service.postTeacher(this.validationForm.value).subscribe((res) => {
      console.log(res);
      if(res.id !=null){
        this.snackbar.open("Teacher posted successfully","Close",{duration:5000});
      }else if(res.id==null){
        this.snackbar.open("Something went wrong","Close",{duration:5000})
      }
    });
  }

}
