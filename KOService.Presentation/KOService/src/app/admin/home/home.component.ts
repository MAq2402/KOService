import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { EditEmployeeService } from 'src/app/shared/services/editEmployee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource: MatTableDataSource<Employee>;
  displayedColumns = [
    'firstName', 'lastName', 'role', 'edit', 'terminate'
  ];
  editIconClicked = false;
  employeeToEdit : Employee;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private spinnerService: SpinnerService,
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private router: Router,
    private editEmployeeService: EditEmployeeService) {
   }

  ngOnInit() {
    this.editEmployeeService.employee = null;
    this.getData();
  }

  ngOnDestroy() {
    if (this.editIconClicked) {
      this.editEmployeeService.employee = this.employeeToEdit;
      this.spinnerService.show(); // hide in add-employee - ngOnInit
    }
  }

  private getData() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource = new MatTableDataSource(employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinnerService.hide(); // show in auth.service -> login
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(employee: Employee) {
    this.employeeToEdit = employee;
    this.editIconClicked = true;
    this.router.navigate(['/admin/add-employee']);
  }

  terminate(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {header: `Jesteś pewny, że chcesz zwolnić pracownika ${employee.firstName} ${employee.lastName}?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        this.employeeService.terminate(employee.id).subscribe(res => {
          this.getData();
        });
      }
    });
  }
}
