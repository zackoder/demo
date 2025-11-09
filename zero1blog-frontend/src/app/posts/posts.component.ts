import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  nothingToFetch = false;
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // 1. Calculate the distance scrolled from the top of the document
    const scrollPosition = window.pageYOffset;

    // 2. Calculate the height of the entire document
    const documentHeight = document.documentElement.scrollHeight;

    // 3. Get the height of the viewport
    const viewportHeight = window.innerHeight;

    // Check if the user is near the bottom (e.g., within 200px)
    if (scrollPosition + viewportHeight >= documentHeight - 200) {
      // console.log(this.nothingToFetch);

      this.fetchPosts();
    }
  }

  fetchPosts() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.nothingToFetch) {
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http
      .get<any[]>('http://localhost:8080/api/getPosts', { headers })
      .subscribe({
        next: (data: any) => {
          if (!Array.isArray(data)) {
            data = [];
            this.nothingToFetch = true;
          }
          this.posts = this.posts.concat(data);
          this.posts.forEach((post: any) => {
            console.log(post.content);
          });
        },
        error: (err) => console.error(err),
      });
  }
}
