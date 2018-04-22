import { Component, OnInit } from '@angular/core';
import { GithubService } from '@core/services/github.service';
import { MatTableDataSource, MatSlideToggleChange } from '@angular/material';

export interface Element {
  linked: boolean;
  full_name: string;
  name: string;
  owner: string;
  html_url: string;
}

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  displayedColumns = ['linked', 'full_name'];
  dataSource: MatTableDataSource<Element>;
  data: any;
  loading = false;
  constructor(private _github: GithubService) { }

  ngOnInit() {
    this.loading = true;

    this._github.getRepos().subscribe(res => {
      console.log(res);
      this.data = res;
      this.initTable(this.data)
      this.loading = false;
    })
  }

  initTable(data) {
    const formatedData = this.formatData(data);
    this.dataSource = new MatTableDataSource(formatedData)
  }
  formatData(data: any[]) {
    const result = [];
    data.forEach(el => {
      const entry: Element = {
        linked: false,
        full_name: el.full_name,
        name: el.name,
        owner: el.owner.login,
        html_url: el.html_url
      };
      result.push(entry);
    })
    return result;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  setToggle(owner, repo){
    this._github.getWebhook(owner, repo).subscribe((res: any[]) => {
      console.log(res);
      const events: string[] = res[0]['events'];
      if(events.length > 0){
        return true;
      }
    })
  }
  onToggle(event: MatSlideToggleChange, owner, repo) {
    if (event.checked) {
      this.createWebhook(owner, repo)
    }
  }
  createWebhook(owner, repo, ping=false) {
    this._github.createWebhook(owner, repo).subscribe(res => {
      const id = res.id;
      if(ping){
        this._github.pingWebhook(owner, repo, id).subscribe(r => console.log(r));
      }
    })
  }
  getWebhooks(owner, repo){
    this._github.getWebhook(owner, repo).subscribe(res => {
      console.log(res);
    })
  }

}
