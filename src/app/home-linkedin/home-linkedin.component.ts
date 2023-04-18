import { Component, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { PostServiceService } from '../Services/post-service.service';
import { CommentservicesService } from '../Services/comment.service';
import { IComment, ICreateComment } from '../Shared-Interface/IComment';
import { FormBuilder, Validators } from '@angular/forms';
import { valueOrDefault } from 'src/assets/vendor/chart.js/helpers';
import { Ilike } from '../Shared-Interface/ILike';
import { interval, lastValueFrom, take } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../Shared-Interface/IUser';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss'],
})
export class HomeLinkedinComponent implements OnInit {
  constructor(private fb: FormBuilder, private _PostService: PostServiceService, private _CommentService: CommentservicesService,private router:Router,) { }
  Posts: IPost[] = [];
  Comments: IComment[] = [];
  Error: any;
  CurrentUser!: IUser;
  IsShowen: boolean = false;

  CreatePostForm = this.fb.group({
    userId: [''],
    postContent: ['', Validators.required],


  });

  CreateComment = this.fb.group({

    postId: [''],
    commentContent: ['', Validators.required]
  })

  Post: ICreatePost = {
    userId: "3740f54c-f6b1-4b00-b917-81c79a58b3d9",
    postContent: ""
  }

  Comment: ICreateComment = {
    userId: "3740f54c-f6b1-4b00-b917-81c79a58b3d9",
    postId: 0,
    commentContent: ""
  }

  like:Ilike = {
    userId:"3740f54c-f6b1-4b00-b917-81c79a58b3d9",
    typeContent:"Post",
    postId:0
  }

  ngOnInit() {
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })

    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    console.log(this.Posts);

  }

  GetCurrentUsers(){
    this._PostService.GetCurrentUser("3740f54c-f6b1-4b00-b917-81c79a58b3d9").subscribe({
      next: data => this.CurrentUser = data,
      
      error: err => console.log(err),
    })
  }

  showComment(PostId: number): void {
    this._CommentService.GetComment(PostId).subscribe({
      next: data => this.Comments = data,
      error: err => this.Error = err,
    })
    this.IsShowen = !this.IsShowen;
    console.log(this.Comments)
  }

  CreatePost() {
    console.log(this.Post)
    this._PostService.CreatePost(this.Post).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
    this.router.navigate(["/Profile"]);

    
    
  }

  CreateCommentFunc(PostId: number) {
    this.Comment.postId = PostId
    this._CommentService.CreateComment(this.Comment).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
    
  }



  checked!:boolean
  AddLike(PostId:number,user:string){
    var service = this._CommentService;
    var tempLike = this.like;
    tempLike.postId=PostId
    tempLike.userId=user
    tempLike.typeContent="Post"
    var checks: any
    async function name(PostId:number,user:string) {
      let status
    return await  service.checkLike(PostId,user).then(val=> {console.log(val),checks=val});
    }
    async function execute() {


      const source$ = interval(1000)
      .pipe(take(2));
      const finalNumber = await lastValueFrom(source$);
      console.log( service.status)
      console.log(`The final number is ${finalNumber}`);
      if(!service.status){

      service.createLike(tempLike).subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
      })
    }else{
      service.deleteLike(PostId,user).subscribe({
        next: data => console.log(data),
        error: err => console.log(err),
      })
    }
    };
    execute();
    this.like.postId=PostId
    this.like.userId=user
    this.like.typeContent="Post"
    console.log(PostId)
    console.log(name(PostId,user))
    console.log(user)
    console.log(this.like)
    console.log(this._CommentService.status)
    console.log(checks)
  }
  
}
