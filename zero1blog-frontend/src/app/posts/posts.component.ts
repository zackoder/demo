import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffsetLimitService } from '../services/offset-limit.service';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  nothingToFetch = false;
  offsetService = new OffsetLimitService();
  isLoading = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('befor fetching', this.offsetService.getOffset());

    this.fetchPosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    if (scrollPosition + viewportHeight >= documentHeight - 200) {
      this.fetchPosts(this.offsetService.getOffset());
    }
  }

  fetchPosts(offset = 0) {
    if (this.isLoading) return;
    this.isLoading = true;
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
      .get<any[]>(`http://localhost:8080/api/getPosts?offset=${offset}`, {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          if (!Array.isArray(data)) {
            data = [];
            this.nothingToFetch = true;
          }
          this.posts = this.posts.concat(data);
          this.posts.forEach((post: any) => {
            console.log(post);
          });
          this.isLoading = false;
          this.offsetService.setOffset(this.posts.length);
        },
        error: (err) => {
          if (err.status) {
            this.router.navigate(['/login']);
          }
          console.error('errro:', err);
          this.isLoading = false;
        },
      });
  }

  reaction(postId: number, reaction: string) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (!reaction || (reaction !== 'like' && reaction !== 'dislike')) {
      return;
    }

    this.http
      .post(
        `http://localhost:8080/api/reaction`,
        { target: 'post', targetId: postId, reactionType: reaction },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: (res) => {
          
        },
        error: (e) => {
          console.log('reacting to post error :', e);
        },
      });
    console.log('post id is:', postId, 'reaction: ', reaction);
  }
  showComments(postId: number) {
    console.log('post id is:', postId);
  }
}
