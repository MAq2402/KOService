import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core-container',
  templateUrl: './core-container.component.html',
  styleUrls: ['./core-container.component.css']
})
export class CoreContainerComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  showNavbar() {
    return !(this.router.url.startsWith('/client') || this.router.url.startsWith('/login'))
    
  }

}
