import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ActivitiesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Activity>;
  showWithStatusOpen = true;
  showWithStatusInProgress = true;
  showWithStatusFinished = false;
  showWithStatusCanceled = false;
  filterValue = '';
  result = '';

  displayedColumns = ['startDateTime', 'description','vehicleRegistrationNumbers', 'vehicleBrand', 'status', 'sequenceNumber'];
  columnsToDisplayMap = [  
    {name: 'description', display: 'Opis'}, 
    {name: 'vehicleRegistrationNumbers', display: 'Numer rejestracyjny'},
    {name: 'vehicleBrand', display: 'Marka pojazdu'},
    {name: 'sequenceNumber', display: 'Priorytet'   
  }];

  constructor(
    private activityService: ActivityService, 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private spinnerService: SpinnerService
  ){ }

  getData(){
    var statusQuery = this.buildStatusQuery();
    if (this.showWithStatusCanceled || this.showWithStatusFinished || this.showWithStatusInProgress || this.showWithStatusOpen) {
      this.authService.getCurrentEmployee().subscribe(user => {
        this.activityService.getMechanicActivity(user.id, statusQuery).subscribe(
          activities => {
            this.dataSource = new MatTableDataSource(activities);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.filter = this.filterValue.trim().toLowerCase();
            this.applyFilter(this.filterValue);
            this.spinnerService.hide(); // show in auth.service -> login
        });
      })
    }
    else{
      this.dataSource = null;
      this.spinnerService.hide(); // show in auth.service -> login
    }
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkIfNotHistorical(status: ActivityStatus): boolean{
    if(status <= ActivityStatus.Progress)
      return true;
    else
      return false;
  }

  clearResult(){
    this.result = '';  
  }

  checkIfOpen(status: ActivityStatus): boolean{
    if(status == ActivityStatus.Open)
      return true;
    else
      return false;
  }

  onStatusCheckboxChange(event: any) {
    this.getData();
  }

  private buildStatusQuery() {
    let statusQuery = '';
    if (this.showWithStatusOpen) {
      statusQuery += 'OPN,';
    }
    if (this.showWithStatusInProgress) {
      statusQuery += 'PRO,';
    }
    if (this.showWithStatusCanceled) {
      statusQuery += 'CAN,';
    }
    if (this.showWithStatusFinished) {
      statusQuery += 'FIN';
    }
    return statusQuery;
  }

  changeToInProgress(activityId: string){    
    this.activityService.changeToInProgress(activityId).subscribe(
      res => this.getData()
    ); 
  } 

  finish(activityId: string){
    
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {header: `Jesteś pewny, że chcesz zakończyć to zadanie?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        if (this.result === '') {
          this.result = 'brak';
        }
    
        this.activityService.finishActivity(activityId, this.result).subscribe(
          res => { 
            this.getData();
            this.clearResult();
        });
      }
    }); 
  }

  cancel(activityId: string){
    if (this.result === '') {
      this.snackBar.open('Podaj przyczynę anulowania!', '',
        {duration: 4000}
      );
    }
    else{ 
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: {header: `Jesteś pewny, że chcesz anulować to zadanie?`}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.confirmed) {
          this.activityService.cancelActivity(activityId, this.result).subscribe(
            res => {
              this.getData();
              this.clearResult();
          });
        }
      }); 
    }
  }
}

