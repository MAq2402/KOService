import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Pricing } from 'src/app/shared/models/pricing.model';

@Component({
  selector: 'app-pricing-view',
  templateUrl: './pricing-view.component.html',
  styleUrls: ['./pricing-view.component.css']
})
export class PricingViewComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<PricingViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      
    } 

  dataSourceArray =  new MatTableDataSource();
  displayedColumns: string[] = ['name', 'manufacturer', 'price'];

  

  ngOnInit() {
    console.log(this.data.pricing)
    this.dataSourceArray = new MatTableDataSource(this.data.pricing.parts)
    console.log(this.dataSourceArray);
  }

}
