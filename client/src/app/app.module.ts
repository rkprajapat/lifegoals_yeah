import { BrowserModule, enableDebugTools } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HttpHeaders, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavResponsiveComponent } from './sidenav-responsive/sidenav-responsive.component';
import { InstancesComponent } from 'app/components/instances/instances.component';
import { SpinnerService } from 'app/services/spinner.service';
import { DeleteConfirmDialogComponent } from './shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { NewInstanceComponent } from 'app/components/instances/new-instance/new-instance.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { JwtInterceptor } from 'app/interceptor/jwt-interceptor';
import { ErrorInterceptor } from 'app/interceptor/error-interceptor';
import { LoginComponent } from 'app/components/login/login.component';
import { HomeComponent } from 'app/components/home/home.component';
import { LoginLayoutComponent } from 'app/components/login-layout/login-layout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourceDetailsComponent } from './components/resources/resource-details/resource-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavResponsiveComponent,
    InstancesComponent,
    DeleteConfirmDialogComponent,
    NewInstanceComponent,
    UsersComponent,
    UserDetailsComponent,
    LoginComponent,
    HomeComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    ResourcesComponent,
    ResourceDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule, /*.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'})*/
    FormsModule,
    SnotifyModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    CommonModule
  ],
  entryComponents: [
    DeleteConfirmDialogComponent,
  ],
  providers: [
    SpinnerService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
