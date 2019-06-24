import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-landing',
  templateUrl: './client-landing.component.html',
  styleUrls: ['./client-landing.component.css']
})
export class ClientLandingComponent implements OnInit {

  repairNumber: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.router.navigate([`client/${this.repairNumber}`])

  }
  disableSubmit(){
    if(this.repairNumber) return false;
    else return true;


  }

}
