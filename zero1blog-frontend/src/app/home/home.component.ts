import { Component } from '@angular/core';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-home',
  imports: [AddPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
