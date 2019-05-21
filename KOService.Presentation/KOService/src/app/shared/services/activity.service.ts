import { Injectable } from '@angular/core';
import {Activity} from '../models/Activity'
import { ActivityStatus } from '../enums/ActivityStatus';
import { Observable, of } from 'rxjs';
import { WorkerActivities } from 'src/app/manager/activity-manager/workers-table/workers-table.component';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivityCreation } from '../models/activity-creation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl = 'https://localhost:44340/api/activities/';

  activities: Activity[] = [
    {id:"1",sequenceNumber:0,description:"wymiania filtra paliwa",result:"result",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",repairId:"1",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"diagnoza silnika",result:"result2",
    status:ActivityStatus.Finished,requestTime:null,closedTime:null,
    activityTypeId:"0",repairId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"wymiana oleju",result:"result2",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",repairId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"wymiania filtra powietrza",result:"result2",
    status:ActivityStatus.Canceled,requestTime:null,closedTime:null,
    activityTypeId:"0",repairId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"czyszczenie klimatyzacji",result:"result2",
    status:ActivityStatus.Progress,requestTime:null,closedTime:null,
    activityTypeId:"0",repairId:"0",workerId:"1"}

]

  constructor(private httpClinet: HttpClient){}

  getWorkersWithActivities(): Observable<any>{
    return this.httpClinet.get(this.baseUrl);
  }

  getWorkerActivities(workerId: string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.workerId===workerId));
  }
  getRepairActivities(repairId:string): Observable<Activity[]>{
    return this.httpClinet.get<Activity[]>(this.baseUrl + 'repair/' + repairId);
  }

  addActivity(activity: ActivityCreation): Observable<Activity>{
    return this.httpClinet.post<Activity>(this.baseUrl,activity,httpOptions);
  }
  
  
}
