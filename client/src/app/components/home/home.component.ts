import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
  }

}
