import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

import {AuthService} from './services/auth.service';
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';

const appRoutes: Routes = [
  {path:'news', component:NewsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReverseArrPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
