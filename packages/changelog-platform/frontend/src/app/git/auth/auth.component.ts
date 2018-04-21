import { Component, OnInit } from '@angular/core';
import { GithubService } from '@core/services/github.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  client_id = '623982830e4b37cdb4a7'
  authApi = `https://github.com/login/oauth/authorize?client_id=${this.client_id}`

  code: any;
  token: any;
  res: any;

  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _github: GithubService
  ) {
  }

  ngOnInit() {
    this._activeRoute.queryParams.subscribe(queryParams => {
      this.code = queryParams['code']

      if (this.code) {
        this._github.postToken(this.code).subscribe(res => {
          this.token = res.access_token;
          this._router.navigate(['repos'])
        })
      }
    });
  }
}
