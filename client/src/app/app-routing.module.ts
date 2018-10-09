import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginLayoutComponent } from 'app/components/login-layout/login-layout.component';
import { HomeLayoutComponent } from 'app/components/home-layout/home-layout.component';
import { HomeComponent } from 'app/components/home/home.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { SidenavResponsiveComponent } from 'app/sidenav-responsive/sidenav-responsive.component';
import { InstancesComponent } from 'app/components/instances/instances.component';
import { NewInstanceComponent } from 'app/components/instances/new-instance/new-instance.component';
import { UsersComponent } from 'app/components/users/users.component';
import { UserDetailsComponent } from 'app/components/users/user-details/user-details.component';
import { LoginComponent } from 'app/components/login/login.component';
import { ResourcesComponent } from 'app/components/resources/resources.component';
import { ResourceDetailsComponent } from 'app/components/resources/resource-details/resource-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent, data: {title: 'First Component'},
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'main', component: HomeLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'instances', component: InstancesComponent },
      { path: 'instances/:id', component: NewInstanceComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/new', component: UserDetailsComponent },
      { path: 'users/:instance_id/:id', component: UserDetailsComponent },
      { path: 'resources', component: ResourcesComponent},
      { path: 'resources/new', component: ResourceDetailsComponent},
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }, // <-- debugging purposes only
    // {useHash: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
