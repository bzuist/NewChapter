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
  Post: Post[] = [];
  Users: Map<number, string> = new Map(); // userID -> username
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/users')
      .subscribe(users => {
        users.forEach(user => {
          // Используем principal.username
          this.Users.set(user.bookshelfID, user.principal.username);
        });

        this.showRandomBooks();
        this.showRandomPosts();
      });
  }

  showRandomBooks() {
    this.http.get<any[]>('http://localhost:3000/fanfics')
      .subscribe(data => {
        this.Fanfic = data.map(fanfic => new Fanfic(fanfic, this.Users));
      });
  }

  showRandomPosts() {
    this.http.get<any[]>('http://localhost:3000/posts')
      .subscribe(data => {
        this.Post = data.map(post => new Post(post, this.Users));
      });
  }

    goToHome(){
      this.router.navigate(['/home']);
    }

    goToUserPage(){
      this.router.navigate(['/userpage/:id'])
    }

}
