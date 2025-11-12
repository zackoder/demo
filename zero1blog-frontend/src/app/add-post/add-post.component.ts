import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OffsetLimitService } from '../services/offset-limit.service';

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

  OffsetService = new OffsetLimitService();

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
        next: (res) => {
          const priv_offset = this.OffsetService.getOffset();
          console.log(priv_offset);

          this.OffsetService.setOffset(priv_offset + 1);
        },
        error: (err) => console.error(err),
      });
  }
}
