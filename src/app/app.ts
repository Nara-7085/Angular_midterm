import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  firstname: string = '';
  lastname: string = '';
  age: number = 0;
  gender: string = '';

  student_list = signal<any[]>([]);
  update_index: number | null = null;


  generateId(length = 5) {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += Math.floor(Math.random() * 10); 
    }
    return id;
  }

  save() {
    const first = this.firstname.trim();
    const last = this.lastname.trim();

    if (!first) {
      alert('Please enter a first name.');
      return;
    }

    if (!last) {
      alert('Please enter a last name.');
      return;
    }

    if (!this.age || this.age < 17 || this.age > 80) {
      alert('Age must be between 17 and 80.');
      return;
    }

    if (!this.gender) {
      alert('Please select a gender.');
      return;
    }

    if (this.update_index !== null) {
      this.student_list.update((list) =>
        list.map((student, index) =>
          index === this.update_index
            ? { ...student, firstname: first, lastname: last, age: this.age, gender: this.gender }
            : student
        )
      );
      alert('Student information updated.');
      this.update_index = null;
    } else {
      const newStudent = {
        id: this.generateId(),
        firstname: first,
        lastname: last,
        age: this.age,
        gender: this.gender,
      };

      this.student_list.update((list) => [...list, newStudent]);
      alert('Student added.');
    }

    this.clearForm();
  }

  editStudent(student: any, index: number) {
    if (confirm(`Edit information for ${student.firstname} ${student.lastname}?`)) {
      this.firstname = student.firstname;
      this.lastname = student.lastname;
      this.age = student.age;
      this.gender = student.gender;
      this.update_index = index;
    }
  }

  deleteStudent(index: number) {
    const student = this.student_list()[index];
    if (confirm(`Delete ${student.firstname} ${student.lastname}?`)) {
      this.student_list.update((list) => list.filter((_, i) => i !== index));
      alert('Student removed.');
      if (this.update_index === index) {
        this.clearForm();
      }
    }
  }

  clearForm() {
    this.firstname = '';
    this.lastname = '';
    this.age = 0;
    this.gender = 'male';
    this.update_index = null;
  }
}
