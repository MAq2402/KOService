import { Injectable } from '@angular/core';
import {Activity} from '../models/Activity'
import { ActivityStatus } from '../enums/ActivityStatus';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activities: Activity[] = [
    {id:"1",sequenceNumber:0,description:"wymiania filtra paliwa",result:"result",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"diagnoza silnika",result:"result2",
    status:ActivityStatus.Finished,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"wymiana oleju",result:"result2",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"wymiania filtra powietrza",result:"result2",
    status:ActivityStatus.Canceled,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"0",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"czyszczenie klimatyzacji",result:"result2",
    status:ActivityStatus.Progress,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"0",workerId:"1"}

]

  getWorkerActivities(workerId: string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.workerId===workerId));
  }
  getActivities(repairId :string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.requestId===repairId));
  }
  
  constructor() { }
}
