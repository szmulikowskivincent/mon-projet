import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  createdPost: any;
  posts: any[] = [];  

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      this.posts = JSON.parse(savedPosts); 
      console.log('Posts récupérés:', this.posts); // Ajoutez un log pour vérifier
    }
  }
  
  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
  
      this.postService.createPost(postData).subscribe(
        response => {
          this.toastr.success('Le post a été créé avec succès!', 'Succès');
  
          this.posts.push(response); 
          localStorage.setItem('posts', JSON.stringify(this.posts)); 
          
          console.log('Nouveaux posts:', this.posts); 
  
          this.postForm.reset();
          this.createdPost = response;
        },
        error => {
          this.toastr.error('Erreur lors de la création du post', 'Erreur');
        }
      );
    }
  }
}