import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-get-all-teachers',
  templateUrl: './get-all-teachers.component.html',
  styleUrl: './get-all-teachers.component.css'
})
export class GetAllTeachersComponent {

  teachers: any;

  constructor(private service:AdminService,
    private snackbar:MatSnackBar){ }

  ngOnInit(){
    this.getAllTeachers(); 
  }

  getAllTeachers(){
    this.service.getAllTeachers().subscribe((res)=>{
      console.log(res);
      this.teachers=res;
    })
  }


  deleteTeacher(teacherId: number) {
    console.log(teacherId);
    this.service.deleteTeacher(teacherId).subscribe((res)=>{
      console.log(res);
      this.getAllTeachers();
      this.snackbar.open("Teacher deleted successfully","Close",{duration:5000});

    })
  }


}
