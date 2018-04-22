import { Component, OnInit } from '@angular/core';
import { GithubService } from '@core/services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from '@core/services/hub.service';
import { Observable } from 'rxjs/Observable';
import { API } from '@config/app.config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authApi: string;
  code: any;

  loading: boolean;
  loggedIn: boolean;
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _github: GithubService,
    private _hub: HubService
  ) {
    this.authApi = API.auth;
    this._hub.getIsLoading().subscribe(bool => this.loading = bool);
    this._hub.getIsLoggedIn().subscribe(bool => this.loggedIn = bool);
  }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this._router.navigate(['repos'])
    }
    this._activeRoute.queryParams.subscribe(queryParams => {
      this.code = queryParams['code']
      console.log(this.code);
      
      if (this.code) {
        this._hub.setIsLoading(true);
        this._github.postToken(this.code).subscribe(res => {
          console.log(res);
          localStorage.setItem('access_token', res.access_token);
          this._hub.setIsLoggedIn(true);
          this._hub.setIsLoading(false);
          this._hub.setUserData(res)
          this._router.navigate(['repos'])
        })
      }
    });
  }
}
