import { Component, OnInit } from '@angular/core';
import { Photo } from '../../interface/photo';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-data-post',
  templateUrl: './data-post.component.html',
  styleUrls: ['./data-post.component.css']
})
export class DataPostComponent implements OnInit {

   photos: Photo[] = [];  

   constructor(private photoService: PhotoService) { }
 
   ngOnInit(): void {
     this.photoService.getPhotos().subscribe(data => {
       this.photos = data;  
     });
   }
 }