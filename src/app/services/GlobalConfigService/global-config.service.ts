import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface GlobalConfig {
  globalTaskDuration$: BehaviorSubject<number>;
  globalBreakDuration$: BehaviorSubject<number>;
  setTaskDuration: (durationValue: number) => void;
  getTaskDuration: () => GlobalConfig['globalTaskDuration$'];
  setBreakDuration: (durationValue: number) => void;
  getBreakDuration: () => GlobalConfig['globalBreakDuration$'];
}

@Injectable({
  providedIn: 'root',
})
export class GlobalConfigService implements GlobalConfig {
  globalTaskDuration$: BehaviorSubject<number>;
  globalBreakDuration$: BehaviorSubject<number>;

  constructor() {
    this.globalTaskDuration$ = new BehaviorSubject<number>(25);
    this.globalBreakDuration$ = new BehaviorSubject<number>(5);
  }

  setTaskDuration = (durationValue: number) => {
    console.log(durationValue);
  };

  getTaskDuration = () => {
    return this.globalTaskDuration$;
  };

  setBreakDuration = (durationValue: number) => {
    console.log(durationValue);
  };

  getBreakDuration = () => {
    return this.globalBreakDuration$;
  };
}
