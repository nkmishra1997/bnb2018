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
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';
import { MarketComponent } from './components/market/market.component';
import { CompanyComponent } from './components/company/company.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//*******************************
//Admin Components
//*******************************
import { DashboardComponent } from './components/dashboard/dashboard.component';         //Admin profile Component
import { NewslistComponent } from './components/newslist/newslist.component';            //Admin newslist component
import { NewsDetailsComponent } from './components/news-details/news-details.component'; //To show details of news to admin
import { UserListComponent } from './components/user-list/user-list.component';          //To show user list to admin
import { CompanylistComponent } from './components/companylist/companylist.component';   //To show company list to admin
import { UserDetailsComponent } from './components/user-details/user-details.component'; //To show user details to admin
import { CompanyDetailsComponent } from './components/company-details/company-details.component';   //TO show company details to admin

import { AdminService } from './services/admin.service';

const appRoutes: Routes = [
  { path:'news', component : NewsComponent },
  { path:'market', component : MarketComponent, },
  { path:'company/:id', component : CompanyComponent },
  { path: 'profile', component : ProfileComponent},
  { path: 'admin', component : DashboardComponent},
  { path: 'admin/news', component: NewslistComponent, pathMatch: 'full'},
  { path: 'admin/news/:id', component: NewsDetailsComponent},
  { path: 'admin/players', component: UserListComponent},
  { path: 'admin/company', component: CompanylistComponent},
  { path: 'admin/player/:id', component: UserDetailsComponent},
  { path: 'admin/company/:id', component: CompanyDetailsComponent}
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
    NewslistComponent,
    NewsDetailsComponent,
    UserListComponent,
    CompanylistComponent,
    UserDetailsComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NewsService, MarketService, CompanyService, ProfileService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
