import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-data-get',
  templateUrl: './data-get.component.html',
  styleUrls: ['./data-get.component.css']
})
export class DataGetComponent implements OnInit {
  @Input() postId: number | null = null;
  posts: any[] = [];
  selectedPost: any = null;
  comments: any[] = [];
  error: string | null = null;
  showModal: boolean = false;

  constructor(private postService: PostService, private toastr: ToastrService) { } 

  ngOnInit(): void {
    if (this.postId) {
      this.loadPostAndComments(this.postId);
    } else {
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Error loading posts';
        this.posts = [];
        this.toastr.error(this.error); 
      }
    });
  }

  loadPostAndComments(postId: number): void {
    this.postService.getPostById(postId).subscribe({
      next: (postData) => {
        this.selectedPost = postData;
        this.postService.getCommentsByPostId(postId).subscribe({
          next: (commentsData) => {
            this.comments = commentsData;
            this.error = null;
          },
          error: (err) => {
            this.error = 'Error loading comments';
            this.comments = [];
            this.toastr.error(this.error);
          }
        });
      },
      error: (err) => {
        this.error = 'Error loading post';
        this.selectedPost = null;
        this.toastr.error(this.error); 
      }
    });
  }

  onPostClick(postId: number): void {
    this.selectedPost = null;
    this.comments = [];
    this.loadPostAndComments(postId);
  }

  openModal(postId: number): void {
    this.showModal = true;
    this.loadPostAndComments(postId);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedPost = null;
    this.comments = [];
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== postId);
        this.toastr.success('Post deleted successfully'); 
      },
      error: (err) => {
        this.error = 'Failed to delete post: ' + err.message;
        this.toastr.error(this.error); 
      }
    });
  }

  updatePost(post: any): void {
    const newTitle = prompt('Update Title:', post.title);
    const newBody = prompt('Update Body:', post.body);

    if (newTitle !== null && newBody !== null) {
      const updatedData = { ...post, title: newTitle, body: newBody };
      this.postService.updatePost(post.id, updatedData).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(p => p.id === post.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.toastr.success('Post updated successfully');
        },
        error: (err) => {
          this.error = 'Failed to update post: ' + err.message;
          this.toastr.error(this.error); 
        }
      });
    }
  }
}




