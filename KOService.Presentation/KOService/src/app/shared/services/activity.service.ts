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

  private baseUrl = 'https://localhost:44340/api/activities/'

  activities: Activity[] = [
    {
      id: '1',
    sequenceNumber: 1,
    description: 'ważne',
    result: 'x',
    status: ActivityStatus.Open,
    startDataTime: 'x',
    endDateTime: 'x',
    activityTypeId: '1',
    repairId: '1',
    mechanicId: '1',
    mechanicName: 'x',
    vehicleRegistrationNumbers: 'x',
    vehicleBrand: 'x'
    },
    {
      id: '1',
    sequenceNumber: 1,
    description: 'wymiana opon',
    result: 'x',
    status: ActivityStatus.Finished,
    startDataTime: 'x',
    endDateTime: 'x',
    activityTypeId: '1',
    repairId: '1',
    mechanicId: '1',
    mechanicName: 'x',
    vehicleRegistrationNumbers: 'x',
    vehicleBrand: 'x'
    },
    {
      id: '1',
    sequenceNumber: 1,
    description: 'wymiana oleju',
    result: 'x',
    status: ActivityStatus.Canceled,
    startDataTime: 'x',
    endDateTime: 'x',
    activityTypeId: '1',
    repairId: '1',
    mechanicId: '1',
    mechanicName: 'x',
    vehicleRegistrationNumbers: 'x',
    vehicleBrand: 'x'
    },
    {
      id: '1',
    sequenceNumber: 1,
    description: 'silnik renowacja',
    result: 'x',
    status: ActivityStatus.Progress,
    startDataTime: 'x',
    endDateTime: 'x',
    activityTypeId: '1',
    repairId: '1',
    mechanicId: '1',
    mechanicName: 'x',
    vehicleRegistrationNumbers: 'x',
    vehicleBrand: 'x'
    }
  ];

  _getRepairActivities(): Activity[] {
    return this.activities;
  }

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
    return this.httpClient.post<Activity>(this.baseUrl,activity,httpOptions);
  }

  getMechanicActivity(mechanicId: string, statusQuery = ''): Observable<Activity[]>{
    return this.httpClient.get<Activity[]>(this.baseUrl + 'mechanic/'+mechanicId,
     {params: new HttpParams().set('status', statusQuery)});
  }

  assignWorker(workerId: string, activityId: string){
    return this.httpClient.put(this.baseUrl + activityId + '/' + workerId,httpOptions);
  }
  
  changeToInProgress(activityId: string):Observable<Activity>{
    return this.httpClient.put<Activity>(this.baseUrl + "changeToInProgress/" + activityId, httpOptions);
  }

  cancelActivity(activityId: string, comment: string):Observable<Activity>{
    return this.httpClient.put<Activity>(this.baseUrl + "cancel/" + activityId,{}, 
    {params: new HttpParams().set('comment', comment)});
  }

  finishActivity(activityId: string, comment: string):Observable<Activity>{
    return this.httpClient.put<Activity>(this.baseUrl + "finish/" + activityId,{},
    {params: new HttpParams().set('comment', comment)});
  } 
}
