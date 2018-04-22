import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HubService {
  private _isLoggedIn: BehaviorSubject<any>;
  private _isLording: BehaviorSubject<any>;
  private _userData: BehaviorSubject<any>;

  constructor(private _http: HttpClient) {
    this._isLoggedIn = new BehaviorSubject(false);
    this._isLording = new BehaviorSubject(false);
    this._userData = new BehaviorSubject([]);
  }

  setIsLoggedIn(bool) {
    this._isLoggedIn.next(bool);
  }
  getIsLoggedIn() {
    return this._isLoggedIn.asObservable();
  }
  setIsLoading(bool) {
    this._isLoggedIn.next(bool);
  }
  getIsLoading() {
    return this._isLording.asObservable();
  }
  setUserData(data) {
    this._userData.next(data);
  }
  getUserData() {
    return this._userData.asObservable();
  }
}
