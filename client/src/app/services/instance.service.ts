import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

import { AppService } from 'app/services/app.service';
import { Instance } from 'app/interfaces/instance';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  instances = {};

  constructor(private app: AppService) { }

  url = this.app.api_url + '/instances';

  /**
   * @return [all instances]
   */
  getAll(): Observable<Instance[]> {
    return this.app.http.get(this.url, { observe: 'response' })
      .pipe(map(res => this.app.extractData(res)))
      .pipe(catchError(error => this.app.handleError(error)));
  }

  /**
   * [getInstancesList description]
   * @return [description]
   */
  getInstancesList(): Observable<any> {
    const temp: any = {};
    this.getAll().subscribe(
      data => {
        for (const i in data) {
          if (data.hasOwnProperty(i)) {
            temp[data[i].id] = data[i].name;
          }
        }
      },
      error => console.error(error)
    );
    return temp;
  }

  /**
   * creates a new instance
   * @param  instance [post data for instance]
   * @return          [created instance]
   */
  create(data): Observable<Instance> {
    // console.log(this.app.csrf_token);
    return this.app.http.post(this.url, data, { observe: 'response' })
      .pipe(map(res => this.app.extractData(res, 'Instance created successfully')))
      .pipe(catchError(error => this.app.handleError(error, 'Could not create new instance')));
  }

  /**
   * get a single instance by id
   * @param  id [description]
   * @return    [description]
   */
  getOne(id: string): Observable<Instance> {
    return this.app.http.get(this.url + '/' + id)
      .pipe(map(res => this.app.extractData(res)))
      .pipe(catchError(error => this.app.handleError(error, 'Could not get instance details')));
  }

  /**
   * Update instances
   * @param  instance [description]
   * @return          [description]
   */
  update(instance: Instance): Observable<Instance> {
    return this.app.http.put(this.url + '/' + instance.id, instance)
      .pipe(map(res => this.app.extractData(res, 'Instance updated successfully')))
      .pipe(catchError(error => this.app.handleError(error)));
  }

  /**
   * Deletes an instance
   * @param id [description]
   */
  delete(id: number): Observable<any> {
    if (id === 1) {
      this.app.handleError(null, 'Can not delete base instance');
      return;
    }
    return this.app.http.delete(this.url + '/' + id)
      .pipe(map(res => this.app.passMessage('Instance deleted')))
      .pipe(catchError(error => this.app.handleError(error, 'Could not delete instance')));
  }
}
