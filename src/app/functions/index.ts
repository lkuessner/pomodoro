import { v4 } from 'uuid';
import { Task } from '../interfaces/tasks';

export { isObservable } from './type.guards';
export function format(time: number) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + String(mins).padStart(2, '0') + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}

export function minutesToSeconds(minutes: number) {
  return minutes * 60;
}

export function secondsToMinutes(seconds: number) {
  return seconds / 60;
}

export function formatDate(date: Date) {
  // Extrahieren von Stunden, Minuten und Sekunden
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  let seconds: string | number = date.getSeconds();

  // Führende Nullen hinzufügen, wenn nötig
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Formatieren des Timestamps im Format HH:MM:SS
  const formattedTime = hours + ':' + minutes + ':' + seconds;
  return formattedTime;
}

export function buildTask(title: Task['title']): Task {
  return {
    id: v4(),
    isDone: false,
    isActive: false,
    title: title,
  };
}

export function compareTasksIsDone(a: Task, b: Task) {
  if (a.isDone === b.isDone) {
    return 0;
  } else if (a.isDone) {
    return 1;
  } else {
    return -1;
  }
}
