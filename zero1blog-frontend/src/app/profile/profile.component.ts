import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, PostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userId: string | null = null;
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!token || !this.userId) {
      this.route.navigate(['/login']);
      return;
    }
    this.getUserData(this.userId, token);
  }

  getUserData(userCredentials: string | null, token: string) {
    this.http
      .get<any>(`${this.baseUrl}/userData/${userCredentials}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
