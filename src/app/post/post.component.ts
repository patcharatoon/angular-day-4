import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

 posts: Post[] = [];
 form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private http: HttpClient
  ) {
    this.titleService.setTitle('Posts');
   }

  ngOnInit() {
const obj$ = this.http.get('https://jsonplaceholder.typicode.com/posts')

obj$.subscribe({
  next: (response: any[]) => {
    this.posts = response.slice(0,5).map((res) => {
      return new Post(res.id, res.title, res.body);
    });
  
    console.log(this.posts);
  }
  })

  this.form = this.fb.group({
    id: [''],
    title: [''],
    body: ['']

  })
  }
  onSubmit(form: FormGroup){

    const value = form.value;
    if (value.id) {
   //update
   const obj$ = this.http.put('https://jsonplaceholder.typicode.com/posts/'+ value.id ,value)

   obj$.subscribe({
     next: (response: any) => {
       console.log(response);
       const post = new Post(
        response.id, response.title, response.body)
        const index = this.posts.findIndex((p) => {return p.id === post.id });
        console.log(index)
        this.posts[index] = post;
     }
   })
    }else{
      //create
      const obj$ = this.http.post('https://jsonplaceholder.typicode.com/posts',value)
    obj$.subscribe({ //ดึงขอมาคือsubscriber
      next: (respose: any) => {
        console.log(respose);
        const post = new Post(
          respose.id, respose.title, respose.body)
         // this.posts = [post, ...this.posts];   การสร้างอาเรขึ้นมาใหม่
         this.posts.unshift(post); //การใช้อะเรตัวเดิม
         this.form.reset();
      }
    })

  }
    }
    
  onClick(post: Post){
    this.form.patchValue({
      id: post.id,
      title: post.title,
      body: post.body
    })


  }
  onDelete(post: Post){
    const con = confirm('Are you sure?');
    if (con){
      const obj$ = this.http.delete('https://jsonplaceholder.typicode.com/posts/'+ post.id)
      obj$.subscribe({
        next: () => {  //nextหมายถึงว่ามันsuccest erroe:()=>{},complete:()=>{} constแอดค่าครั้งนึงเปลี่ยนค่าไม่ได้อีกเลย
            // const index = this.posts
            // .findIndex((p) => {
            //   return p.id === post.id 
            // });
            // this.posts.splice(index, 1);
            this.posts = this.posts
            .filter(p => p.id !== post.id);
        }
      })

    }
  }
  
  

}
