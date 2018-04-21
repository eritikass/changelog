import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {

  constructor(private _http: HttpClient) { }

  authenticate() {
    const api = 'http://localhost:8080/api/github/auth'
    return this._http
      .get<any>(api)
  }

  postToken(code) {
    const api = 'http://localhost:8080/api/github/token'
    // const client_id = '623982830e4b37cdb4a7'
    // const client_secret = 'a1b8be569be2072e46ab884fbfee0c63a65d02bb'
    // const api = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`
    return this._http
      .post<any>(api, { token: code })
  }

  getRepos() {
    const api = 'http://localhost:8080/api/github/repos'
    return this._http
      .get<any>(api)
  }

}
