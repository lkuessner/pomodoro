import { Observable } from 'rxjs';

export function isObservable<T>(obj: any): obj is Observable<T> {
  return !!obj && typeof obj.subscribe === 'function';
}
