import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { GithubService } from '@core/services/github.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = 'dark-theme';

  OnInit(){}

}
