import { Injectable } from '@angular/core';
import {Activity} from '../models/Activity'
import { ActivityStatus } from '../enums/ActivityStatus';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activities: Activity[] = [
    {id:"1",sequenceNumber:0,description:"description",result:"result",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"description2",result:"result2",
    status:ActivityStatus.Finished,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"0",workerId:"1"}
]

  getWorkerActivities(workerId: string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.workerId===workerId));
  }
  

  constructor() { }
}
