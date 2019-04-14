import { Component, OnInit } from '@angular/core';

import { Role } from '../../shared/enums/Role';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {  
  roles = Role;
  constructor() { }

  ngOnInit() {
    console.log(this.roles);
  }

}
