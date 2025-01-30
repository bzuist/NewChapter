import { Bookshelf } from './../../models/bookshelf';
import { Post } from 'src/app/models/post';
import { Component, OnInit } from '@angular/core';
import { Fanfic } from 'src/app/models/fanfics';
import { User } from './../../models/user';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatCard } from '@angular/material/card';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadComponentComponent } from '../read.component/read.component.component';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  fanfics: Fanfic[];
  user: User;
  bookshelf: Bookshelf[];
  post: Post[];
  id: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private baseService: BaseServiceService,
    private route: Router,
    public dialog: MatDialog,
    private authservice: AuthService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.loadUserData(this.id);

      this.loadUserFanfics(this.id);

      this.loadUserPosts(this.id);

      this.loadBookshelf(this.id);
    }

    loadUserData(userId: number): void {
      this.baseService.getUserById(userId).subscribe(
        (data: User) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }

    loadUserFanfics(userId: number): void {
      this.baseService.getFanficsByUserId(userId).subscribe(
        (data: Fanfic[]) => {
          this.fanfics = data;
        },
        (error) => {
          console.error('Error fetching fanfics:', error);
        }
      );
    }

    loadUserPosts(userId: number): void {
      this.baseService.getUserPosts(userId).subscribe(
        (data: Post[]) => {
          this.post = data;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
    }

    loadBookshelf(userId: number): void {
      this.baseService.getBookshelfByUserId(userId).subscribe(
        (data: Bookshelf[]) => {
          this.bookshelf = data;
        },
        (error) => {
          console.error('Error fetching bookshelf:', error);
        }
      );
    }

    navigateToPost(postId: number): void {
      this.route.navigate(['/post', postId]);
    }

    openFanficDialog(fanficId: number): void {
      const dialogRef = this.dialog.open( ReadComponentComponent, {
        data: { fanficId }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Dialog result:', result);
        }
      });
    }
  }

