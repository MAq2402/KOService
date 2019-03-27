import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-container',
  templateUrl: './core-container.component.html',
  styleUrls: ['./core-container.component.css']
})
export class CoreContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isUserLogged() {
    return false;
  }

}
