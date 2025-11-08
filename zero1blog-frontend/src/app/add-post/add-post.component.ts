import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  data = {
    content: '',
    file: File,
  };
  constructor(private http: HttpClient, private router: Router) {}
  onSubmit() {
    console.log(this.data);

    const token = localStorage.getItem('jwtToken');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post('http://localhost:8080/api/addPost', this.data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err),
      });
  }
}
