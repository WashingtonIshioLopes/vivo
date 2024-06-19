/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();

  getAlert() {
    return this.subject.asObservable();
  }

  success(message: string) {
    this.alert('success', message);
  }

  error(message: string) {
    this.alert('danger', message);
  }

  info(message: string) {
    this.alert('info', message);
  }

  warn(message: string) {
    this.alert('warning', message);
  }

  private alert(type: string, message: string) {
    this.subject.next({ type, message });
  }

  clear() {
    this.subject.next(null);
  }
}

