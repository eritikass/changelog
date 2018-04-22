import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@config/app.config';

@Injectable()
export class GithubService {

  constructor(private _http: HttpClient) { }

  authenticate() {
    return this._http
      .get<any>(API.auth)
  }

  postToken(code) {
    return this._http
      .post<any>(API.token, { token: code })
  }
  getUser() {
    return this._http
      .get<any>(API.user)
  }
  getRepos() {
    return this._http
      .get<any>(API.repos)
  }
  getWebhook(owner, repo) {
    const payload = {
      owner: owner,
      repo: repo
    };
    return this._http
      .post<any>(API.get_webhook, payload)
  }
  // hasWebhook(owner, repo) {
  //   const payload = {
  //     owner: owner,
  //     repo: repo
  //   };
  //   return this._http
  //     .post<any>(API.has_webhook, payload)
  // }
  createWebhook(owner, repo){
    const payload = {
      owner: owner,
      repo: repo
    };
    return this._http
      .post<any>(API.post_webhook, payload)
  }
  pingWebhook(owner, repo, id) {
    const payload = {
      owner: owner,
      repo: repo,
      id: id
    };
    return this._http
      .post<any>(API.ping_webhook, payload)
  }

}
