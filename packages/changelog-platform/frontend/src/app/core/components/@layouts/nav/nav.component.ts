import { Component, OnInit } from '@angular/core';
import { GithubService } from '@core/services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from '@core/services/hub.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  client_id = '623982830e4b37cdb4a7'
  authApi = `https://github.com/login/oauth/authorize?client_id=${this.client_id}&scope=user%20repo%20repo_deployment%20admin:repo_hook%20admin:org_hook`
  code: any;

  user: any;
  loading: boolean;
  loggedIn: boolean;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _github: GithubService,
    private _hub: HubService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this._github.getUser().subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
    }
    this._hub.getIsLoading().subscribe(bool => this.loading = bool);
    this._hub.getIsLoggedIn().subscribe(bool => this.loggedIn = bool);
    this._hub.getUserData().subscribe((data: any[]) => {
      // if (data.length > 0) {
      //   console.log(data[0]);
      //   this.avatar_url = data[0].owner.avatar_url;
      //   console.log(data);
      // }
    });
  }
}
