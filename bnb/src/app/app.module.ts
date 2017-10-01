import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

import { AuthService } from './services/auth.service';
import { NewsService } from './services/news.service';
import { MarketService } from './services/market.service';
import { CompanyService } from './services/company.service';
import { ReverseArrPipe } from './pipes/reverse-arr.pipe';
<<<<<<< HEAD
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanylistComponent } from './components/companylist/companylist.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { NewslistComponent } from './components/newslist/newslist.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const appRoutes: Routes = [
  {path:'news', component:NewsComponent},
  {path:'admin', component:DashboardComponent},
  {path:'admin/company', component: CompanylistComponent},
  {path:'admin/addcompany', component: AddCompanyComponent},
  {path:'admin/news', component: NewslistComponent},
  {path:'admin/addnews', component: AddNewsComponent},
  {path:'admin/newsdetail/:id', component: NewsDetailsComponent},
  {path:'admin/companydetail/:id', component: CompanyDetailsComponent},
  {path:'admin/user', component: UserListComponent},
  {path:'admin/userdetail/:id', component: UserDetailsComponent}
=======
import { MarketComponent } from './components/market/market.component';
import { CompanyComponent } from './components/company/company.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  { path:'news', component : NewsComponent },
  { path:'market', component : MarketComponent },
  { path:'company/:id', component : CompanyComponent }
>>>>>>> a6c46d123cf6c5d8e5058e48ed1a0be47edc1c84
]

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    ReverseArrPipe,
<<<<<<< HEAD
    DashboardComponent,
    CompanylistComponent,
    AddCompanyComponent,
    CompanyDetailsComponent,
    NewslistComponent,
    AddNewsComponent,
    NewsDetailsComponent,
    UserListComponent,
    UserDetailsComponent
=======
    MarketComponent,
    CompanyComponent,
    ProfileComponent
>>>>>>> a6c46d123cf6c5d8e5058e48ed1a0be47edc1c84
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, NewsService, MarketService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
