import { Component } from '@angular/core';
import { StudentResponse, StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

  constructor(private studentService: StudentService) { }

  students!: StudentResponse[];
  isLoading: boolean = false;

  ngOnInit() {
    this.getStudentLists();
  }

  getStudentLists() {
    this.isLoading = true;
    //We have remove the 'any' type of typescript along with res
    // because it is now already described with interface

    this.studentService.getStudents().subscribe((res) => {
      console.log(res);
      this.students = res.students;
      this.isLoading = false;

    });
  }

  deleteStudent(event: any, studentId: number) {
    if (confirm('Are you sure that you want to delete the data ?')) {
      event.target.innerText = 'Deleting...';

      this.studentService.destroyStudent(studentId).subscribe((res: any) => {
        this.getStudentLists();
        alert(res.message);
      });

    }
  }
}
