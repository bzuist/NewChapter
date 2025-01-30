import { principal } from "./principal";

export interface User {
  principal: principal;
  usernamename: string;
  bookshelfID: number;
  bookID: number;
  postID: number;
  authorName: string;
  userID: number;
  postcommentID: number;
}

export class User {
  principal: principal;
  usernamename: string;
  bookshelfID: number;
  bookID: number;
  postID: number;
  authorName: string;
  userID: number;
  postcommentID: number;

  constructor(data: any, usersMap: Map<number, string>) {
    this.userID = data.userID;
    this.postcommentID = data.postcommentID;
    this.authorName = usersMap.get(data.userID) as string;
    this.usernamename = data.usernamename;
    this.principal = data.principal;
    this.bookshelfID = data.bookshelfID;
    this.bookID = data.bookID;
    this.postID = data.postID;
  }
}
