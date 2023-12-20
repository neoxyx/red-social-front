import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private sharedDataSubject = new BehaviorSubject<any>(null);

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }

  getSharedData(): Observable<any> {
    return this.sharedDataSubject.asObservable();
  }
}
