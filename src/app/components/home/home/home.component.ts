import { principal } from './../../../models/principal';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fanfic } from 'src/app/models/fanfics';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Fanfic: Fanfic[] = [];
  post: Post[] = [];
  Users: Map<number, string> = new Map();
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/users')
      .subscribe(users => {
        console.log("Полученные пользователи:", users);
        users.forEach(user => {
          const userID = Number(user.id) || user.userID;
          if (userID && user.username) {
            this.Users.set(userID, user.username);
          } else {
            console.warn("Некорректный пользователь:", user);
          }
        });
        console.log("Карта пользователей:", this.Users);
        this.showRandomBooks();
        this.showRandomPosts();
      });
  }

  showRandomBooks() {
    if (this.Users.size === 0) return;
    this.http.get<any[]>('http://localhost:3000/fanfics')
      .subscribe(data => {
        this.Fanfic = data.map(fanfic => new Fanfic(fanfic, this.Users));
      });
  }

  showRandomPosts() {
    if (this.Users.size === 0) return;
    this.http.get<any[]>('http://localhost:3000/blogs')
      .subscribe(data => {
        this.post = data
          .map(post => post ? new Post(post, this.Users) : null)
          .filter((post): post is Post => post !== null);
      });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToUserPage() {
    this.router.navigate(['/userpage/:id']);
  }

  goToMenu() {
    this.router.navigate(['/menu']);
  }

  goToBlogsPage() {
    this.router.navigate(['/blogs']);
  }

  goToReadComponent(fanficId: number) {
    this.router.navigate(['/fanfic', fanficId]);
  }

  goToBlogComponent(postId: number) {
    this.router.navigate(['/blogs', postId]);
  }
}
