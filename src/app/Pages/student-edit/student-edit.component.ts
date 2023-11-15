import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {

  studentId!: any;
  student!: any;

  isLoading: boolean = false;
  loadingTitle: string = 'Loading';
  errors: any = [];

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit() {

    this.studentId = this.route.snapshot.paramMap.get('id');
    // alert(this.studentId);

    this.isLoading = true;

    this.studentService.getStudent(this.studentId).subscribe(res => {
      // console.log(res);

      this.student = res.student;
      this.isLoading = false;
    });
  }

  updateStudent() {

    var inputData = {
      name: this.student.name,
      course: this.student.course,
      email: this.student.email,
      phone: this.student.phone,
    }
    this.isLoading = true;

    this.studentService.updateStudent(inputData, this.studentId).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
        this.isLoading = false;
      },

      error: (err: any) => {
        console.log(err);
        this.errors = err.error.errors;
        this.isLoading = false;
      }
    });

  }
}
