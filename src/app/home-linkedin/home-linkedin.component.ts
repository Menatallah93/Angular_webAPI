import { Component, OnInit } from '@angular/core';
import { IPost } from '../Shared-Interface/IPost';
import { PostServiceService } from '../Services/post-service.service';
import { CommentservicesService } from '../Services/comment.service';
import { IComment } from '../Shared-Interface/IComment';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss']
})
export class HomeLinkedinComponent implements OnInit {
  constructor(private _PostService: PostServiceService, private _CommentService: CommentservicesService) { }
  Posts: IPost[] = [];
  Comments: IComment[] = [];
  Error: any;
  IsShowen: boolean = false;
  showComment(PostId: number): void {
    this._CommentService.GetComment(PostId).subscribe({
      next: data => this.Comments = data,
      error: err => this.Error = err,
    })
    this.IsShowen = !this.IsShowen;
    console.log(this.Comments)
  }
  ngOnInit() {
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    console.log(this.Posts);
  }
}
