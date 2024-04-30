import { Observable } from 'rxjs';
import { Task } from '../tasks';

export interface CountdownState {
  value: number;
  startValue: number;
  breakStartValue: number;
  running: boolean;
  isBreakActive: boolean;
  expired: boolean;
}

export interface ICountdownService {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
  resetCountdownToInitialState: () => void;
  getCountdownState: () => Observable<CountdownState>;
  setCountdownValue: (value: CountdownState['value']) => void;
  setCountdownStartValue: (value: CountdownState['startValue']) => void;
  setCountdownBreakStartValue: (
    value: CountdownState['breakStartValue']
  ) => void;
  setCountdownBreak: (isBreakActive: CountdownState['isBreakActive']) => void;
  setCountdownExpired: (expired: CountdownState['expired']) => void;
}
