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

  private baseUrl = 'https://localhost:44340/api/Activities/'




  constructor(private httpClient: HttpClient){}

  getWorkersWithActivities(): Observable<any>{
    return this.httpClient.get(this.baseUrl);
  }

  getWorkerActivities(workerId: string){
   
  }
  getRepairActivities(repairId:string): Observable<Activity[]>{
    return this.httpClient.get<Activity[]>(this.baseUrl + 'repair/' + repairId);
  }

  addActivity(activity: ActivityCreation): Observable<Activity>{
    console.log("jestem")
    return this.httpClient.post<Activity>(this.baseUrl,activity,httpOptions);
  }

  getMechanicActivity(mechanicId: string, statusQuery = ''): Observable<Activity[]>{
    return this.httpClient.get<Activity[]>(this.baseUrl + 'mechanic/'+mechanicId,
     {params: new HttpParams().set('status', statusQuery)});
  }
  
  changeToInProgress(activityId: string):Observable<Activity>{
    console.log("clicked");
    return this.httpClient.put<Activity>(this.baseUrl + "open/" + activityId, httpOptions);
  }

  cancelActivity(activityId: string, comment: string):Observable<Activity>{
    
    return this.httpClient.put<Activity>(this.baseUrl + "cancel/" + activityId, 
    {params: new HttpParams().set('comment', comment)});
  }

  finishActivity(activityId: string, comment: string):Observable<Activity>{
    console.log("finish");
    return this.httpClient.put<Activity>(this.baseUrl + "finish/" + activityId,
    {params: new HttpParams().set('comment', comment )});
  }


  
}
