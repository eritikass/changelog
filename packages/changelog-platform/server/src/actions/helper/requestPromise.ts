import * as request from 'request';
import * as rp from 'request-promise';

export const requestPromise = (options, callback, errorHandler) => rp(options).then(res => callback(res)).catch(err => errorHandler(err));