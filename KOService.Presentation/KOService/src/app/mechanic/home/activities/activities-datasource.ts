import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { ActivityStatus } from 'src/app/shared/enums/ActivityStatus';

export interface ActivitiesItem {
  id: string;
  sequenceNumber: number;
  description: string;
  result: string;
  status: ActivityStatus;
  requestTime: string;
  closedTime: string;
  activityTypeId: string;
  requestId: string;
  workerId: string;
}

export class ActivitiesDataSource extends DataSource<any> {
  data: Activity[];
  mechanicId: string;
  constructor(
    private paginator: MatPaginator, 
    private sort: MatSort,
    private activityService: ActivityService) {
    super();
  }


  connect(): Observable<ActivitiesItem[]> {

    this.mechanicId = localStorage.getItem('auth_key');
    this.activityService.getWorkerActivities('1')
       .subscribe(a => (this.data = a));

    const dataMutations = [
      this.data,
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: ActivitiesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: ActivitiesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'requestId': return compare(a.requestId, b.requestId, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
