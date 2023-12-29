import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrls: ['./post-student.component.css'] // Corrected typo here
})
export class PostStudentComponent {
  CLASS: string[] = ["Play", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];
  GENDER: string[] = ["Male", "Female", "Not Specified"];
  isSpinning: boolean;
  validationForm: FormGroup;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validationForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return null; // Return null for a valid case
  };

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator]], // Use an array for multiple validators
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      studentClass: ['', Validators.required],
      dateOfBirth: ['', Validators.required], // Changed from dob to dateOfBirth
      address: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  postStudent() {
    console.log(this.validationForm.value);
    this.isSpinning = true;
    this.service.addStudent(this.validationForm.value).subscribe((res) => {
      this.isSpinning=false;
      if(res.id !=null){
        this.snackbar.open("Student posted successfully","Close",{duration:5000});
      }else{
        this.snackbar.open("Student already exist","Close",{duration:5000});
      }
    });
  }
}