import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


import { AppService } from 'app/services/app.service';
import { SpinnerService } from 'app/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private app: AppService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router) { }

  login_url = this.app.api_url + '/login';
  logout_url = this.app.api_url + '/logout';

  /**
   * [login description]
   * @param  email    [description]
   * @param  password [description]
   * @return          [description]
   */
  login(email: string, password: string) {
    return this.app.http.post<any>(this.login_url, { email: email, password: password }, { observe: 'response' })
      .pipe(map(data => {
        const user = data.body;
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoginSubject.next(true);
          this.spinnerService.display(false); // stops running the spinner until data is returned
        }
        return user;
      }))
      .pipe(catchError(error => this.app.handleError(error)));
  }

  /**
   * [logout description]
   * @return [description]
   */
  logout() {
    return this.app.http.get<any>(this.logout_url)
      .pipe(map(res => {
        localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
        this.spinnerService.display(false); // stops running the spinner until data is returned
        // this.router.navigate(['/login']);
        return res;
      }))
      .pipe(catchError(error => this.app.handleError(error)));
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  /**
*
* @returns {Observable<T>}
*/
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
