import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { NewsService } from './services/news.service';
import { MarketService } from './services/market.service';
import { CompanyService } from './services/company.service';
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';
import { MarketComponent } from './components/market/market.component';
import { CompanyComponent } from './components/company/company.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//*******************************
//Admin Components
//*******************************
import { DashboardComponent } from './components/dashboard/dashboard.component';    //Admin profile Component
import { NewslistComponent } from './components/newslist/newslist.component';       //Admin newslist component

import { AdminService } from './services/admin.service';

const appRoutes: Routes = [
  { path:'news', component : NewsComponent },
  { path:'market', component : MarketComponent },
  { path:'company/:id', component : CompanyComponent },
  { path: 'profile', component : ProfileComponent},
  { path: 'admin', component : DashboardComponent},
  { path: 'admin/news', component: NewslistComponent, pathMatch: 'full'}
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
    DashboardComponent,
    NewslistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NewsService, MarketService, CompanyService, ProfileService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
