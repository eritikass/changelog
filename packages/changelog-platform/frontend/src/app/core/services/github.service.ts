import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {

  constructor(private _http: HttpClient) { }

  authenticate() {
    const api = 'http://localhost:8080/api/oauth/auth'
    return this._http
      .get<any>(api)
  }

  postToken(code) {
    const api = 'http://localhost:8080/api/oauth/token'
    return this._http
      .post<any>(api, { token: code })
  }

  getRepos() {
    const api = 'http://localhost:8080/api/github/repos'
    return this._http
      .get<any>(api)
  }

  createWebhook(owner, repo){
    const api = 'http://localhost:8080/api/github/webhook'
    const payload = {
      owner: owner,
      repo: repo
    };
    return this._http
      .post<any>(api, payload)
  }

}
