import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  baseUrl = environment.apiUrl;
  show = false;
  isAdmin = true;
  data: any;
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.userCredentials();
  }

  openProfile() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate([`/profile/${this.data.nickname}.${this.data.id}`]);

  }

  userCredentials() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get(`${this.baseUrl}/userCredentials`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (res) => {
          this.data = res;
          console.log(this.data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  toggle() {
    this.show = !this.show;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
