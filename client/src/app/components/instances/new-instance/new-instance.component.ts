import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SpinnerService } from 'app/services/spinner.service';
import { InstanceService } from 'app/services/instance.service';
import { Instance } from 'app/interfaces/instance';

@Component({
  selector: 'app-new-instance',
  templateUrl: './new-instance.component.html',
  styleUrls: ['./new-instance.component.scss']
})
export class NewInstanceComponent implements OnInit {
  instance = new Instance();
  @ViewChild('f') form: any;


  constructor(private instanceService: InstanceService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute) { }

  /**
   * Submit new instance creation form
   * @return [description]
   */
  onSubmit() {
    this.spinnerService.display(true);
    if (this.instance.id) {
      this.instanceService.update(this.instance).subscribe(
        data => {
          this.instance = data;
        },
        error => console.error(error));
    } else {
      this.instanceService.create(this.instance).subscribe(
        data => {
          this.instance = data;
        },
        error => console.error(error));
    }
  }

  /**
   * runs on initialization
   * @return [description]
   */
  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== 'new' && this.route.snapshot.paramMap.get('id')) {
      this.spinnerService.display(true);
      this.instanceService.getOne(this.route.snapshot.paramMap.get('id')).subscribe(
        res => {
          this.instance = res;
          console.log(res);
        },
        error => { console.error(error); }
      );
    }
  }
}
