import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OffsetLimitService } from '../services/offset-limit.service';
import { ReportComponent } from '../report/report.component';
import { environment } from '../../environments/environment.prod';
import { error } from 'node:console';

@Component({
  selector: 'app-posts',
  imports: [ReportComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  nothingToFetch = false;
  offsetService = new OffsetLimitService();
  isLoading = false;
  posts = signal<any>([]);
  prevScrollPosition = window.pageYOffset;
  targetedPost = -1;
  reportForm = false;
  deleteChecker = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('before fetching', this.offsetService.getOffset());
    this.fetchPosts();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const newvScrollPosition = window.pageYOffset;
    if (newvScrollPosition < this.prevScrollPosition) return;
    else this.prevScrollPosition = newvScrollPosition;

    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    if (this.prevScrollPosition + viewportHeight >= documentHeight - 200) {
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
      .get<any[]>(`${this.baseUrl}/getPosts?offset=${offset}`, {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);

          if (!Array.isArray(data) || data.length === 0) {
            data = [];
            this.nothingToFetch = true;
          }
          this.posts.update((current) => [...current, ...data]);
          this.isLoading = false;
          this.targetedPost = -1;
          this.offsetService.setOffset(this.posts().length);
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

  reaction(postId: number, reaction: string, index: number) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (!reaction || (reaction !== 'like' && reaction !== 'dislike')) {
      return;
    }
    if (!postId) {
      alert("id doesn't exists");
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
          this.posts()[index].likes += 1;
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

  formatDate(ceaiation: number) {
    let now: number = new Date().getTime() / 1000;
    let ceaiationDate = new Date(ceaiation * 1000);
    let duration: number = now - ceaiation;
    let onemin = 60;
    let oneHour = onemin * 60;
    let oneDay = oneHour * 24;
    let oneMon = oneDay * 30;

    if (duration > oneMon * 6) {
      return `${ceaiationDate.getFullYear()}/${
        ceaiationDate.getMonth() + 1
      }/${ceaiationDate.getDate()}`;
    }

    if (duration >= oneMon) {
      const months = Math.floor(duration / oneMon);
      return months === 1 ? '1 Month ago' : `${months} Months ago`;
    }

    if (duration >= oneDay) return `${Math.floor(duration / oneDay)} d ago`;

    if (duration >= oneHour) return `${Math.floor(duration / oneHour)} H ago`;

    if (duration >= onemin) return `${Math.floor(duration / onemin)} min ago`;

    return `${Math.floor(duration)} s ago`;
  }

  toggle(index: number) {
    console.log(this.reportForm);
    if (index == this.targetedPost) this.targetedPost = -1;
    else this.targetedPost = index;
  }
  // showReportForm(postId: number) {
  //   console.log('post id', postId);
  // }

  closeReport(event: any) {
    if (typeof event !== 'boolean') return;
    this.reportForm = event;
  }

  delete(index: number) {
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) {
      this.router.navigate(['/login']);
      return;
    }
    const postId: number = this.posts()[index].id;
    this.http
      .delete<any>(`${this.baseUrl}/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'post deleted') {
            this.posts.update((current: []) => {
              const newPosts = [...current];
              newPosts.splice(index, 1);
              return [...newPosts];
            });
            console.log('before', this.deleteChecker);
            this.deleteChecker = false;
            this.targetedPost = -1;
            console.log('after', this.deleteChecker);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  setReportForm(newVal: boolean) {
    this.reportForm = newVal;
  }
}
