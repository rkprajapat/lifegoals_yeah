import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from '@angular/http';

import { AppService } from 'app/services/app.service';
import { User } from 'app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private app: AppService) { }

  url = this.app.api_url + '/users';

  /**
   * @return [all instances]
   */
  getAll(search_term, offset, limit): Observable<User[]> {
    if (!search_term) {
      search_term = '';
    }
    return this.app.http.get(this.url, {
      observe: 'response',
      params: {
        name: search_term,
        offset: offset,
        limit: limit
      }
    })
      .pipe(map(res => this.app.extractData(res)))
      .pipe(catchError(error => this.app.handleError(error)));
  }

  /**
   * [returns object by instance id and object id]
   * @param  instance_id [description]
   * @param  object_id   [description]
   * @return             [description]
   */
  getOne(instance_id: number, object_id: number): Observable<User> {
    return this.app.http.get(this.url + '/' + instance_id + '/' + object_id)
      .pipe(map(res => this.app.extractData(res)))
      .pipe(catchError(error => this.app.handleError(error, 'Could not fetch object details')));
  }

  /**
   * [create description]
   * @param  data [description]
   * @return      [description]
   */
  create(data): Observable<User> {
    return this.app.http.post(this.url, data, { observe: 'response' })
      .pipe(map(res => this.app.extractData(res, 'User created successfully')))
      .pipe(catchError(error => this.app.handleError(error, 'Could not create new user')));
  }

  /**
   * [delete description]
   * @param  obj [description]
   * @return     [description]
   */
  delete(obj): Observable<void> {
    if (obj.id === 1 && obj.instance_id === 1) {
      this.app.handleError(null, 'Can not delete root user');
      return;
    }
    return this.app.http.delete(this.url + '/' + obj.instance_id + '/' + obj.id)
      .pipe(map(res => this.app.passMessage('User deleted')))
      .pipe(catchError(error => this.app.handleError(error, 'Could not delete user')));
  }

  /**
   * [update description]
   * @param  obj [description]
   * @return     [description]
   */
  update(obj: User): Observable<User> {
    return this.app.http.put(this.url + '/' + obj.instance_id + '/' + obj.id, obj, { observe: 'response' })
      .pipe(map(res => this.app.extractData(res, 'User updated successfully')))
      .pipe(catchError(error => this.app.handleError(error, 'Could not update user')));
  }
}
