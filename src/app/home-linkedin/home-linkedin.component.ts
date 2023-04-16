import { Component, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { PostServiceService } from '../Services/post-service.service';
import { CommentservicesService } from '../Services/comment.service';
import { IComment, ICreateComment } from '../Shared-Interface/IComment';
import { FormBuilder, Validators } from '@angular/forms';
import { valueOrDefault } from 'src/assets/vendor/chart.js/helpers';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss'],
})
export class HomeLinkedinComponent implements OnInit {
  constructor(private fb: FormBuilder, private _PostService: PostServiceService, private _CommentService: CommentservicesService) { }
  Posts: IPost[] = [];
  Comments: IComment[] = [];
  Error: any;
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
    userId: "292c22c6-2574-4cbc-979e-c94a0640eca0",
    postContent: ""
  }

  Comment: ICreateComment = {
    userId: "292c22c6-2574-4cbc-979e-c94a0640eca0",
    postId: 0,
    commentContent: ""
  }

  ngOnInit() {
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    console.log(this.Posts);

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
    this._PostService.CreatePost(this.Post).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
  }

  CreateCommentFunc(PostId: number) {
    this.Comment.postId = PostId
    this._CommentService.CreateComment(this.Comment).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
  }
}
