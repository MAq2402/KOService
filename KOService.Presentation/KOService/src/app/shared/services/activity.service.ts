import { Injectable } from '@angular/core';
import {Activity} from '../models/Activity'
import { ActivityStatus } from '../enums/ActivityStatus';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activities: Activity[] = [
    {id:"1",sequenceNumber:0,description:"naprawa ",result:"result",
    status:ActivityStatus.Open,requestTime:'2018-12-12',closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"2",sequenceNumber:1,description:"description2",result:"result2",
    status:ActivityStatus.Finished,requestTime:'2018-11-25',closedTime:'2018-12-12',
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"3",sequenceNumber:0,description:"description",result:"result",
    status:ActivityStatus.Open,requestTime:'2019-01-01',closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"4",sequenceNumber:1,description:"description2",result:"brak komentarza",
    status:ActivityStatus.Finished,requestTime:'2018-11-20',closedTime:'2018-12-03',
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"5",sequenceNumber:0,description:"description",result:"result",
    status:ActivityStatus.Canceled,requestTime:'2018-04-19',closedTime:'2018-05-17',
    activityTypeId:"0",requestId:"1",workerId:"1"},
    {id:"6",sequenceNumber:1,description:"description2",result:"result2",
    status:ActivityStatus.Progress,requestTime:'2019-02-02',closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1"}
]

  getWorkerActivities(workerId: string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.workerId===workerId));
  }
  
  constructor() { }
}
