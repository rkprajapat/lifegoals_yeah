import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { SpinnerService } from 'app/services/spinner.service';
import { InstanceService } from 'app/services/instance.service';
import { Resource, Attribute } from 'app/interfaces/resource';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss']
})
export class ResourceDetailsComponent implements OnInit {
  instances = {};
  selected_instance: number;
  instance_id: any;
  resource_id: any;
  resource = new Resource();
  sections = {0: ''};
  @ViewChild('f') form: any;

  constructor(private instanceService: InstanceService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.instances = this.instanceService.getInstancesList();

    if (this.route.snapshot.paramMap.get('instance_id') && this.route.snapshot.paramMap.get('id')) {
      this.spinnerService.display(true);
      this.instance_id = this.route.snapshot.paramMap.get('instance_id');
      this.resource_id = this.route.snapshot.paramMap.get('id');
      // this.userService.getOne(this.instance_id, this.user_id).subscribe(
      //   res => {
      //     this.user = res;
      //   },
      //   error => {
      //     console.error(error);
      //   }
      // );
    }
  }

  /**
   * [addAttr description]
   * @return [description]
   */
  addAttr() {
    const attr = new Attribute();
    this.resource.attributes.push(attr);
  }

  /**
   * [getSections description]
   * @return [description]
   */
  getSections() {
    for (const item in this.resource.attributes) {
      if (item.hasOwnProperty('section_name')) {
        this.sections[item['section_order_num']] = item['section_name'];
      } else {
        this.sections[0] = '';
      }
    }

    return Object.keys(this.sections);
  }

  /**
   * return keys of an object for iteration in html
   * @param  obj [description]
   * @return     [description]
   */
  getKeys(obj) {
    return Object.keys(obj);
  }

}
