import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface StudentResponse {
  id: number,
  name: string,
  course: string,
  email: string,
  phone: string,
  created_at: string,
  updated_at: string

}

export interface StudentResponseType {
  status: number,
  students: StudentResponse[]
}

export interface StudentEditResponse {
  status: number,
  student: StudentResponse
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  getStudents() {

    return this.httpClient.get<StudentResponseType>(`http://127.0.0.1:8000/api/students`);
  }

  getStudent(studentId: number) {

    return this.httpClient.get<StudentEditResponse>(`http://127.0.0.1:8000/api/students/${studentId}/edit`)
  }

  saveStudent(InputData: object) {

    return this.httpClient.post(`http://127.0.0.1:8000/api/students`, InputData);
  }

  updateStudent(InputData: object, studentId: number) {

    return this.httpClient.put(`http://127.0.0.1:8000/api/students/${studentId}/edit`, InputData);
  }

  destroyStudent(studentId: number) {
    return this.httpClient.delete(`http://127.0.0.1:8000/api/students/${studentId}/delete`)
  }
}
