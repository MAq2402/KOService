import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  /*TODO:
    dodać do AuthService globalen currentIdentity pobierane w login()
     i ustawiane w construktorze jak jest authenticated
  */

  ngOnInit() {
  }

  isUserLogged() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  getUserHomeComponent() {
    this.authService.currentEmployee.identityRole;
  }

}
