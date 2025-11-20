import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report',
  imports: [FormsModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
  reportReason = '';
  error = '';
  @Input() postId!: number;
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}
  onsubmitReport() {
    const token = localStorage.getItem('jwtToken');

    if (!token) this.router.navigate(['/login']);

    if (this.reportReason.trim() === '') {
      this.error = "report can't be empty";
      return;
    }

    this.error = '';
    console.log(this.postId);
    console.log(this.baseUrl);

    this.http
      .post(
        `${this.baseUrl}/report`,
        {
          target: 'post',
          targetId: this.postId,
          content: this.reportReason,
          createdAt: 0,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
