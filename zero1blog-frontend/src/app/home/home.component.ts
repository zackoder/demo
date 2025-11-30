import { Component } from '@angular/core';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostsComponent } from '../posts/posts.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    AddPostComponent,
    PostsComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
