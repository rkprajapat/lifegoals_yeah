import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SpinnerService } from 'app/services/spinner.service';
import { User } from 'app/interfaces/user';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-sidenav-responsive',
  templateUrl: './sidenav-responsive.component.html',
  styleUrls: ['./sidenav-responsive.component.scss']
})
export class SidenavResponsiveComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  showSpinner: Observable<boolean>;
  currentUser: User;

  fillerNav = [
    { name: 'Instances', path: 'instances' },
    { name: 'Users', path: 'users' },
    { name: 'Resources', path: 'resources'},
    { name: 'Admin', path: 'admin' },
    { name: 'Help', path: 'help' }
  ];

  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private spinnerService: SpinnerService,
    private authService: AuthenticationService,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   * [ngOnDestroy description]
   */
  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   * [ngOnInit description]
   * @return [description]
   */
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    this.showSpinner = this.spinnerService.status;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * [signout description]
   * @return [description]
   */
  signout() {
    this.spinnerService.display(true); // starts running the spinner until data is returned
    this.authService.logout()
      .subscribe(res => console.log(res),
        error => console.error(error));
  }

  /**
   * redirect all sidenav nav links
   * @param  link [description]
   * @return      [description]
   */
  redirectTo(link) {
    console.log(link);
    this.router.navigate([link]);
  }

}
