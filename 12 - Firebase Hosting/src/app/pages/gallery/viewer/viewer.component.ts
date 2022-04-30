import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comment';
import { GalleryService } from '../../../shared/services/gallery.service';
import { CommentService } from '../../../shared/services/comment.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;

  // commentObject: any = {};
  comments: Array<Comment> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private galleryService: GalleryService,
    private commentService: CommentService,
    private userService: UserService
    ) { }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
        /* let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        } */
      });
      this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments => {
        this.comments = comments;
      })
    }
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });
    
  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        this.commentsForm.get('date')?.setValue(new Date().getTime());

        // SPREAD OPERATOR
        // this.comments.push({ ...this.commentsForm.value });


        // Object
        // this.comments.push(Object.assign({}, this.commentObject));
        
        // TODO: INSERT
        this.commentService.create(this.commentsForm.value).then(_ => {
          this.router.navigateByUrl('/gallery/successful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

}
