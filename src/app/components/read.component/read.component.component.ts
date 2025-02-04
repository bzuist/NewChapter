import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/models/fanfics';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read.component',
  templateUrl: '/read.component.component.html',
  styleUrls: ['./read.component.component.css'],
})
export class ReadComponentComponent implements OnInit {
  fanfic: Fanfic;
  id: number;
  userId: number;
  Users: Map<number, string> = new Map();
  isLoggedIn = false;

  constructor(
    private baseService: BaseServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
    this.loadUsers();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.id = Number(idParam);
      console.log("ReadComponent ID:", this.id);

      this.baseService.getFanficById(this.id).subscribe({
        next: (data) => {
          this.fanfic = data;
        },
        error: (error) => {
          console.error("Error retrieving fanfic:", error);
        },
      });
    } else {
      console.error("Fanfic ID is null or undefined");
    }
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/users')
      .subscribe((users: User[]) => {
        console.log("Полученные пользователи:", users);
        users.forEach((user: User) => {
          const userID = Number(user.id) || user.userID;
          if (userID && user.username) {
            this.Users.set(userID, user.username);
          } else {
            console.warn("Некорректный пользователь:", user);
          }
        });
        console.log("Карта пользователей:", this.Users);
      });
  }
}
