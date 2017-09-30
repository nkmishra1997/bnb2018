import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

import { AuthService } from './services/auth.service';
import { NewsService } from './services/news.service';
import { MarketService } from './services/market.service';
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';
import { MarketComponent } from './components/market/market.component';

const appRoutes: Routes = [
  { path:'news', component : NewsComponent },
  { path:'market', component : MarketComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReverseArrPipe,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NewsService, MarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
