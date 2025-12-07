import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  baseUrl = environment.apiUrl;
  show = false;
  isAdmin = true;
  constructor(private http: HttpClient, private router: Router) {}
  getUserData() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get(`${this.baseUrl}/api/userData`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  toggle() {
    console.log(this.show);

    this.show = !this.show;
  }

  logout() {
    console.log('hello');

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
