import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { SignalRsService } from '../Services/SignalR.service';
import { AuthorizeService } from '../Services/authorize.service';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { LikeService } from '../Services/LikeService';
import { HttpClient } from '@microsoft/signalr';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss'],
})

export class HomeLinkedinComponent implements OnInit {
  @ViewChild('postsDiv') postsDiv!:ElementRef;
  
  Mydiv!: HTMLDivElement | null;

  constructor(private renderer: Renderer2,private LikeService:LikeService ,private Auth:AuthorizeService 
    ,public signalRService: SignalRsService,private fb: FormBuilder,
     private _PostService: PostServiceService, 
     private _CommentService: CommentservicesService,
     private router:Router,http : HttpClient) { }
     
  Posts: IPost[] = [];
  Comments: IComment[] = [];
  Error: any;
  CurrentUser!: IUser;
  IsShowen: boolean = false;
  private hubConnectionBuilder!: HubConnection;
  PostID:Number=0;
  selectedFile! :File;

  CreatePostForm = this.fb.group({
    userId: [''],
    postContent: ['', Validators.required],
    image : [''],

  });

  CreateComment = this.fb.group({

    postId: [''],
    commentContent: ['', Validators.required]
  })

  Post: ICreatePost = {
    userId: this.Auth.gettokenID(),
    postContent: "",
    image : ""
  }

  Comment: ICreateComment = {
    userId: this.Auth.gettokenID(),
    postId: 0,
    commentContent: ""
  }

  like:Ilike = {
    userId:this.Auth.gettokenID(),
    typeContent:"Post",
    postId:0
  }

  async ngOnInit() {
    this.GetCurrentUsers(this.Auth.gettokenID());
    console.log(this.CurrentUser)
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,
      
      error: err => this.Error = err,
    })
    this._PostService.GetPosts().subscribe({
      next: data => this.Posts = data,

      error: err => this.Error = err,
    })
    console.log(this.Posts);
    
    this.hubConnectionBuilder = new signalR.HubConnectionBuilder().withUrl('https://localhost:7223/Commenthub',
    {
      skipNegotiation : true ,
      transport:signalR.HttpTransportType.WebSockets
    }).configureLogging(signalR.LogLevel.Debug).build();

    setTimeout(() => {
      this.hubConnectionBuilder.start().then(() => {
        console.log("connection started");
      }).catch(err => console.log(err));
    }, 2000);
    
    
  }
  
  


  async addElement() {
    
    await this.signalRService.StartPostConnection();
    
    setTimeout(async () => {
      await this.signalRService.askServer(this.Post,this.CurrentUser,this.Auth.gettokenID())
    }, 2000);
    
  //   var Mydiv1 = document.getElementById("postsDiv"); 
  //   console.log(Mydiv1)
  //   const p: HTMLElement = this.renderer.createElement('p');
  //   p.innerHTML += `<div class="card-body">

  //   <div class="d-flex m-3">
   
  //    <div class="m-1">
   
  //      <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" width="70px"
  //        height="70px">
  //    </div>
  //   <div class="m-3">
  //     <h4 style="font-weight: bold;">
  //       ${this.CurrentUser.fName}
  //     </h4>
  //     <p>
  //     ${this.CurrentUser.image}
  //     </p>
  //   </div>
   
  //  </div>
   
  //  <div style="width: 100%; height: 70%;">
  //    <p>${this.Post.postContent}</p>
  //    <img src="assets/img/profile-img.jpg" alt="Profile" width="100%" height="50%">
  //  </div>
  //  <hr class="mt-3">
  //  <div class="btn-group" role="group" aria-label="Basic outlined example">
  //    <a type="button" class="btn btn-outline-primary btn-md"(click)="AddLike(Post.id,Post.userId)" >
  //    <i class="fa-regular fa-thumbs-up"></i>
  //    0 Like</a>
  //  <a type="button" class="btn btn-outline-primary btn-md" (click)="showComment(Post.id)"><i
  //       class="fa-solid fa-comment"></i> Comment</a>
  //   <a type="button" class="btn btn-outline-primary btn-md"><i class="fa-sharp fa-share"></i> Share</a>
  //  </div>`

    // console.log(p)
    // Mydiv1?.appendChild(p)
    
    
  }

  GetCurrentUsers(id:string){
    this._PostService.GetCurrentUser(id).subscribe({
      next: data => this.CurrentUser = data,
      
      error: err => console.log(err),
    })
  }

  PostImage(event:any){
    this.selectedFile = <File>event.target.files[0]
  }

  onUpload() {
    
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
    this.addElement();
    
    console.log(this.Post)
    this._PostService.CreatePost(this.Post).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    
    
  }

  async CreateCommentFunc(PostId: number) {
    this.Comment.postId = PostId
    this._CommentService.CreateComment(this.Comment).subscribe({
      next: data => console.log(data),
      error: err => console.log(err),
    })

    this.PostID=PostId;
    this.hubConnectionBuilder.invoke('NewCommentAdded',this.Comment);
    await this.hubConnectionBuilder.on('NewCommentNotify',function(Cot) {
          console.log("MArina");
          const element: HTMLElement = document.getElementById("CreateCommentSignalR") as HTMLElement;
          element.innerHTML +=
           
                    `<div class="m-3">

                      <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle" width="70px"
                        height="70px">
                    </div>

                    <div class="m-3 lh-2">
                      <span style="font-size: 18px; font-weight: bold;">Marwa</span>
                      <br>
                      .Net Developer 
                      <br>
                      <br>
                      <p>${Cot.commentContent}</p>

                    </div>`

          
    });
    
  }


  showProfile(userId: string) {
    this.router.navigate(["/profile", userId]);
  }

//////////////////// Start Like Functions 
checked!:boolean
async AddLike(PostId:number,user:string){
   var service = this.LikeService;
   var tempLike = this.like;
   var signal = this.signalRService
   tempLike.postId=PostId
   tempLike.userId=user
   tempLike.typeContent="Post"
   var checks: any
async function   addNotify(){
  await signal.StartLikeConnection();
     setTimeout(async () => {

       await signal.likeNotify(PostId)
     },1000)
   }
   // addNotify()
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
     // addNotify()
   }else{
     service.deleteLike(PostId,user).subscribe({
       next: data => console.log(data),
       error: err => console.log(err),
     })
     // addNotify()
   }
 };
 execute();
 addNotify()
   this.like.postId=PostId
   this.like.userId=user
   this.like.typeContent="Post"
   console.log(PostId)
   console.log(name(PostId,user))
   console.log(user)
   console.log(this.like)
   console.log(this.LikeService.status)
   console.log(checks)
 }
  
}
