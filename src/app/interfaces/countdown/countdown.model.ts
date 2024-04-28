export interface CountdownState {
  value: number;
  startValue: number;
  running: boolean;
  break: false;
}

export interface ICountdownService {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
  setCountdownStartValue: (value: CountdownState['startValue']) => void;
}
