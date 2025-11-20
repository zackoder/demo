import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OffsetLimitService } from '../services/offset-limit.service'; // Assuming this service exists

@Component({
  selector: 'app-add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  content: string = '';
  selectedFile: File | null = null;

  OffsetService = new OffsetLimitService();

  constructor(private http: HttpClient, private router: Router) {}

  OnSelectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile.name);
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.warn('JWT Token not found. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    const formData = new FormData();

    formData.append('content', this.content);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.http
      .post('http://localhost:8080/api/addPost', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res) => {
          console.log('Post created successfully:', res);

          const priv_offset = this.OffsetService.getOffset();
          this.OffsetService.setOffset(priv_offset + 1);

          this.content = '';
          this.selectedFile = null;

          const fileInput = document.getElementById(
            'fileInput'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        },
        error: (err) => console.error('Error during post creation:', err),
      });
  }
}
