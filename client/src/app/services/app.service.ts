import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnotifyService } from 'ng-snotify';


import { SpinnerService } from 'app/services/spinner.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

// @Injectable()
export class AppService {
  constructor(public http: HttpClient,
    private spinnerService: SpinnerService,
    private snotifyService: SnotifyService,
    private tokenExtractor: HttpXsrfTokenExtractor) { }

  api_url = 'http://localhost:5000';
  data: any;
  error_msg: any;
  csrf_token: string;

  // extracts information from service calls
  public extractData(res, msg = '') {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    if (res.body === null) {
      this.spinnerService.display(false);
      return;
    }
    if (res.body instanceof Array) {
      this.data = res.body.map(i => JSON.parse(i));
    } else if (res.body) {
      this.data = res.body;
    } else {
      this.data = res;
    }
    // // TODO: enable later
    // this.csrf_token = <string>this.tokenExtractor.getToken();
    this.spinnerService.display(false);
    if (msg !== '') {
      this.snotifyService.success(msg, 'Success', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    return this.data || {};
  }

  // handles service call errors
  public handleError(error = null, msg = null) {
    this.error_msg = '';

    if (error && msg) {
      this.error_msg = msg + ' - ' + error.status + ' ' + error.statusText;
    } else {
      this.error_msg = msg || error.status + ' ' + error.statusText;
    }

    this.snotifyService.error(this.error_msg, 'Error', {
      timeout: 2000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    });

    this.spinnerService.display(false);
    return throwError(this.error_msg);
  }

  // return message for successfuly edits
  public passMessage(msg = '') {
    if (msg !== '') {
      this.snotifyService.info(msg, 'Information', {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    this.spinnerService.display(false);
  }
}
