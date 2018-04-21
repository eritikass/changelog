import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LINKS } from '@config/app.config';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  namespaces: string[];
  currentNamespace: string;
  namespaceSelector = false;

  navLinks = LINKS.activeLinks;
  constructor(
    
  ) {
  }

  ngOnInit() {
  }

  login(){
    
  }
}
