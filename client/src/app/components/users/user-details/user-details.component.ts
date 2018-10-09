import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

import { SpinnerService } from 'app/services/spinner.service';
import { InstanceService } from 'app/services/instance.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/interfaces/user';
import { DeleteConfirmDialogComponent } from 'app/shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  instances = {};
  selected_instance: number;
  user = new User();
  @ViewChild('f') form: any;
  user_id: any;
  instance_id: any;


  constructor(
    private instanceService: InstanceService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _location: Location
  ) { }

  /**
   * return keys of an object for iteration in html
   * @param  obj [description]
   * @return     [description]
   */
  getKeys(obj) {
    return Object.keys(obj);
  }

/**
 * [ngOnInit description]
 * @return [description]
 */
  ngOnInit() {
    this.instances = this.instanceService.getInstancesList();

    if (this.route.snapshot.paramMap.get('instance_id') && this.route.snapshot.paramMap.get('id')) {
      this.spinnerService.display(true);
      this.instance_id = this.route.snapshot.paramMap.get('instance_id');
      this.user_id = this.route.snapshot.paramMap.get('id');
      this.userService.getOne(this.instance_id, this.user_id).subscribe(
        res => {
          this.user = res;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  /**
   * [delete description]
   * @param instance_id [description]
   * @param user_id     [description]
   */
  delete(instance_id, user_id, user_name): void {
    // open the delete confirmation dialog
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        type: 'user',
        name: user_name,
      }
    });
    // wait for dialog value to be returned
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.spinnerService.display(true);
        this.userService.delete(this.user).subscribe(
          res => { this._location.back(); },
          error => { console.error(error); });
      }
    },
      error => { console.error(error); });
  }

  /**
   * Submit new instance creation form
   * @return [description]
   */
  onSubmit() {
    this.spinnerService.display(true);
    if (this.user.instance_id && this.user.id) {
      this.userService.update(this.user).subscribe(
        data => {
          this.user = data;
        },
        error => console.error(error));
    } else {
      this.user.instance_id = this.selected_instance;
      this.userService.create(this.user).subscribe(
        data => {
          this.user = data;
        },
        error => console.error(error));
    }
  }

}
