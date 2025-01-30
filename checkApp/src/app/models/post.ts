export interface Post {
  userID: number;
  postdescription: string;
  title: string;
  postcommentID: number;
  authorname: string;
}


export class Post {
  userID: number;
  postdescription: string;
  title: string;
  postcommentID: number;
  authorname:string;

  constructor(data: any, usersMap: Map<number, string>){
    this.userID = data.userID;
    this.authorname = usersMap.get(data.user.ID) as string;
    this.postdescription = data.postdescription;

  }
}
