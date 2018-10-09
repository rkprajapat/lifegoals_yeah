import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SpinnerService } from 'app/services/spinner.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  all_users: User[] = [];
  search_term: string;
  limit = 100;
  offset = 0;

  constructor(private userService: UserService,
    private spinnerService: SpinnerService) { }

  /**
   * [ngOnInit description]
   * @return [description]
   */
  ngOnInit() {
    this.getAll();
  }

  /**
   * capture keyboard action.
   * @param  event [description]
   * @return       [description]
   */
  @HostListener('document:keypress', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  /**
   * it returns all instances and loads in instances variable
   */
  getAll(): void {
    this.spinnerService.display(true); // starts running the spinner until data is returned
    this.userService.getAll(this.search_term, this.offset, this.limit).
      subscribe(data => {
        if (data && data.length > 0) {
          this.all_users = this.all_users.concat(data);
        }
        this.users$ = of(this.all_users);
      },
        error => console.error(error));
  }

  /**
   * [search description]
   */
  search(): void {
    this.all_users = [];
    this.offset = 0;
    this.getAll();
  }

  /**
   * manages infite scroll
   * @return [description]
   */
  onScroll() {
    if (this.all_users.length >= (this.offset + this.limit)) {
      this.offset = this.offset + this.limit;
      this.getAll();
    }

  }

}
