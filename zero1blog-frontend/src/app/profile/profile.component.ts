// import { Component, OnInit } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.prod';
// import { PostsComponent } from '../posts/posts.component';

// @Component({
//   selector: 'app-profile',
//   imports: [NavbarComponent, PostsComponent],
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css',
// })
// export class ProfileComponent implements OnInit {
//   userId: string | null = null;
//   baseUrl = environment.apiUrl;
//   constructor(
//     private http: HttpClient,
//     private route: Router,
//     private activatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
//       this.userId = params.get('id');
//       console.log(this.userId);
//     });
//   }
// }
