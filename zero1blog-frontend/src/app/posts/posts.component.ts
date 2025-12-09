import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffsetLimitService } from '../services/offset-limit.service';
import { ReportComponent } from '../report/report.component';
import { environment } from '../../environments/environment.prod';
import { PostsService } from '../services/posts.service';
import { CommentsComponent } from '../comments/comments.component';
import { formatDate as formatDateUtil } from '../utils/dateFormater';

@Component({
  selector: 'app-posts',
  imports: [ReportComponent, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private baseUrl = environment.apiUrl;
  nothingToFetch = false;
  isLoading = false;
  prevScrollPosition = window.pageYOffset;
  targetedPost = -1;
  reportForm = false;
  deleteChecker = false;
  showTargetedPostId = -1;

  @Input() target: string = '';
  @Input() profileData: string | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private offsetService: OffsetLimitService,
    public postsService: PostsService
  ) {}

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

    console.log('profile data: ', this.profileData);

    this.http
      .get<any[]>(
        `${this.baseUrl}/${this.target}${
          this.profileData ? '/' + this.profileData : ''
        }?offset=${offset}`,
        {
          headers,
        }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);

          if (!Array.isArray(data) || data.length === 0) {
            data = [];
            this.nothingToFetch = true;
          }
          this.postsService.setPosts(data);

          this.isLoading = false;
          this.targetedPost = -1;
          this.offsetService.setOffset(this.postsService.getPosts().length);
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
      .post<any>(
        `${this.baseUrl}/reaction`,
        { target: 'post', targetId: postId, reactionType: reaction },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .subscribe({
        next: (res) => {
          const targetedPost = this.postsService.getPosts()[index];
          if (res == null) {
            targetedPost.dislikes = 0;
            targetedPost.likes = 0;
            targetedPost.reacted = '';
            return;
          }
          targetedPost.dislikes = res.dislikes;
          targetedPost.likes = res.likes;
          targetedPost.reacted = res.reacted;
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
    return formatDateUtil(ceaiation);
  }

  toggle(index: number) {
    console.log(this.reportForm);
    if (index == this.targetedPost) this.targetedPost = -1;
    else this.targetedPost = index;
  }

  closeReport(event: boolean) {
    this.reportForm = event;
  }

  delete(index: number) {
    const jwt = localStorage.getItem('jwtToken');
    if (!jwt) {
      this.router.navigate(['/login']);
      return;
    }
    const postId = this.postsService.getPosts()[index].id;

    this.http
      .delete<any>(`${this.baseUrl}/deletePost/${postId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'post deleted') {
            this.postsService.deletePost(index);
            // this.postsService.setPosts(res);
            this.deleteChecker = false;
            this.targetedPost = -1;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
