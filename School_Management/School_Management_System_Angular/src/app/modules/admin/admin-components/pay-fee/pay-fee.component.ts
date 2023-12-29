import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css'] // Fix styleUrl to styleUrls
})
export class PayFeeComponent {

  studentId: number = this.activatedroute.snapshot.params['studentId'];

  validationForm: FormGroup; // Fix to instantiate FormGroup

  isSpinning: boolean = false;

  MONTH: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  constructor(
    private service: AdminService,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar:MatSnackBar) {}

  ngOnInit() {
    this.validationForm = this.fb.group({
      amount: ['', Validators.required],
      month: ['', Validators.required],
      givenBy: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  payFee() {
  this.service.payFee(this.studentId,this.validationForm.value).subscribe(
    (res)=>{
      console.log(res);
      if(res.id!=null){
        this.snackbar.open("Fee Paid successfully","Close",{duration:5000});
      }else{
        this.snackbar.open("Something went Wrong","Close",{duration:5000});
      }
    }
  )    
  }
}
