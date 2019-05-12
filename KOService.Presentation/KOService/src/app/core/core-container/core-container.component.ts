import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-core-container',
  templateUrl: './core-container.component.html',
  styleUrls: ['./core-container.component.css']
})
export class CoreContainerComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  isUserLogged() {
    return this.authService.isAuthenticated();
  }

}
