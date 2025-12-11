import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Router, NavigationEnd } from '@angular/router';
import { NgClass } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { OffsetLimitService } from '../services/offset-limit.service';

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
  isLoading = false;
  data: any;
  currentPath!: string;
  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.userCredentials();
        this.currentPath = this.router.url;
        console.log(this.currentPath);
      }
    });
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
    if (this.isLoading) return;
    this.isLoading = true;
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
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
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

  // goHome() {
  //   console.log('go home');
  //   if (this.router.url !== '/') {
  //     this.posts.deleteAll();
  //     this.offset.setOffset(0);
  //   }

  //   this.router.navigate(['/']);
  // }
}
