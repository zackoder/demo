import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts = signal<any[]>([]);

  constructor() {}
  setPosts(newPosts: []) {
    return this.posts.update((current) => [...current, ...newPosts]);
  }

  addOnePost(newPost: []) {
    this.posts.update((current) => [...newPost, ...current]);
  }

  getPosts() {
    return this.posts();
  }

  deletePost(index: number) {
    this.posts.update((current) => {
      const newPosts = [...current];
      newPosts.splice(index, 1);
      return [...newPosts];
    });
  }
  deleteAll() {
    this.posts = signal<any[]>([]);
  }
}
