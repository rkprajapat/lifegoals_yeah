import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SpinnerService } from 'app/services/spinner.service';
import { InstanceService } from 'app/services/instance.service';
import { Instance } from 'app/interfaces/instance';
import { DeleteConfirmDialogComponent } from 'app/shared/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit {
  instances: Instance[];

  constructor(private instanceService: InstanceService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog) { }

  // Load all instances
  ngOnInit() {
    this.getAll();
  }

  /**
   * it returns all instances and loads in instances variable
   */
  getAll(): void {
    this.spinnerService.display(true); // starts running the spinner until data is returned
    this.instanceService.getAll()
      .subscribe(data => {
        this.instances = data;
      },
        error => { console.error(error); });
  }

  /**
   * deletes an instance
   * @param id   [id of the instance]
   * @param name [name of the instance]
   */
  delete(id, name): void {
    // open the delete confirmation dialog
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        type: 'instance',
        name: name,
      }
    });
    // wait for dialog value to be returned
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.spinnerService.display(true);
        this.instanceService.delete(id).subscribe(res => this.getAll(), error => { console.error(error); });
      }
    },
      error => { console.error(error); });
  }

}
