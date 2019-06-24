import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private counter = 0;

  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  public show() {
    if(this.counter === 0) {
      this.ngxSpinnerService.show();
    }
    console.log('show ' + this.counter);
    this.counter++;
  }

  public hide() {
    console.log('hide ' + this.counter)
    this.ngxSpinnerService.hide();
    if(this.counter > 1) {
      this.counter--;
    } else {
      this.counter = 0;
      this.ngxSpinnerService.hide();
    }
  }
}
