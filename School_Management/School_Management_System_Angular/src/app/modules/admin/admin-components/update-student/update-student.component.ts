import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {

  studentId:number=this.activateRoute.snapshot.params['studentId'];
  validationForm:FormGroup;
  isSpinning:boolean;

  CLASS: string[] = ["Play", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
  GENDER: string[] = ["Male", "Female", "Not Specified"];



  constructor(private service:AdminService,
    private activateRoute:ActivatedRoute,
    private fb:FormBuilder,
    private snackbar:MatSnackBar){}

  ngOnInit(){
    this.validationForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      studentClass: ['', Validators.required],
      dateOfBirth: ['', Validators.required], // Changed from dob to dateOfBirth
      address: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.getStudentById();
  }

  getStudentById(){
    this.service.getStudentById(this.studentId).subscribe((res)=>{
      const student=res.studentDto;
      this.validationForm.patchValue(student);
      console.log(res);
    })
  }

  updateStudent() {
    this.service.updateStudent(this.studentId,this.validationForm.value).subscribe(
      (res)=>{
        console.log(res)
        if(res.id!=null) {
          this.snackbar.open("Student updated successfully.","Close",{duration:5000});
        }else{
          this.snackbar.open("Student not found.","Close",{duration:5000}); 
        }
      }
    )
  }

}
