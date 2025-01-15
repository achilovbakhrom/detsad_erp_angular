import { environment } from '../../../environments/environment';

export const infoLog = (...arg: any[]) => {
  if (!environment.production) {
    console.log(...arg);
  }
};

export const errorLog = (...arg: any[]) => {
  if (!environment.production) {
    console.error(...arg);
  }
};
