import { Injectable } from '@angular/core';
import {Activity} from '../models/Activity'
import { ActivityStatus } from '../enums/ActivityStatus';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activities: Activity[] = [
    {id:"1",sequenceNumber:0,description:"wymiania filtra paliwa",result:"result",
    status:ActivityStatus.Open,requestTime:null,closedTime:null,
    activityTypeId:"0",requestId:"1",workerId:"1", vehicleRegistrationNumbers:"sk-123",
    vehicleBrand: "bmw"},
    

]


private baseUrl = 'https://localhost:44340/api/Activities';

constructor(private http: HttpClient) { }


  getWorkerActivities(workerId: string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.workerId===workerId));
  }
  getRequestActivities(requestId:string): Observable<Activity[]>{
    return of(this.activities.filter(activity=>activity.requestId===requestId));
  }

  getMechanicActivity(mechanicId: string): Observable<Activity[]>{
    return this.http.get<Activity[]>(this.baseUrl + '/mechanic/'+mechanicId);
  }
  
}