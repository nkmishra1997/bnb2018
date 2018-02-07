import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { NewsService } from './services/news.service';
import { MarketService } from './services/market.service';
import { CompanyService } from './services/company.service';
import { LeaderboardService } from './services/leaderboard.service';
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';
import { MarketComponent } from './components/market/market.component';
import { CompanyComponent } from './components/company/company.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

import { AdminnewslistComponent } from './components/adminnewslist/adminnewslist.component';
import { AdminService } from './services/admin.service';
import { AdminaddnewsComponent } from './components/adminaddnews/adminaddnews.component';

import { FlashMessagesModule } from 'angular2-flash-messages';

const appRoutes: Routes = [
  { path:'news', component : NewsComponent },
  { path:'market', component : MarketComponent, },
  { path:'company/:id', component : CompanyComponent },
  { path: 'profile', component : ProfileComponent},
  { path: 'leaderboard', component : LeaderboardComponent},
  { path: 'admin/news', component : AdminnewslistComponent},
  { path: 'admin/addnews', component : AdminaddnewsComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReverseArrPipe,
    MarketComponent,
    CompanyComponent,
    ProfileComponent,
    NavbarComponent,
    LeaderboardComponent,
    BottomNavComponent,
    AdminnewslistComponent,
    AdminaddnewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [AuthService, NewsService, MarketService, CompanyService, ProfileService, LeaderboardService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
