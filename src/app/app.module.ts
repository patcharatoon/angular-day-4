import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { Route, RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './header-profile/header-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { HttpClientModule } from '@angular/common/http';

const route: Route[] = [ 
  //เมื่อกดปุ่มprofileข้างบน เมื่อไหร่ก็ตามurlของเราที่ชื่อว่าfileอยู่ เอาไปเรนเดอรืทับให้จุดๆนึง
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'posts',
    component: PostComponent
  },{
    path: 'posts/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderProfileComponent,
    PostComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //ให้angของเราสร้างformได้
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
