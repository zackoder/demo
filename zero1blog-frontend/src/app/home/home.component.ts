import { Component } from '@angular/core';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostsComponent } from '../posts/posts.component';



@Component({
  selector: 'app-home',
  imports: [AddPostComponent, PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
}
