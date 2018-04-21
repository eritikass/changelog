import { Component, OnInit } from '@angular/core';
import { GithubService } from '@core/services/github.service';
import { MatTableDataSource } from '@angular/material';

export interface Element {
  repo_linked: boolean;
  repo_name: string;
}

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  displayedColumns = ['repo_linked', 'repo_name'];
  dataSource: MatTableDataSource<Element>;
  data: any;
  constructor(private _github: GithubService) { }

  ngOnInit() {
    this._github.getRepos().subscribe(res => {
      console.log(res);
      this.data = res;
      this.initTable(this.data)
    })
  }

  initTable(data){
    const formatedData = this.formatData(data);
    this.dataSource = new MatTableDataSource(formatedData)
  }
  formatData(data: any[]){
    const result = [];
    data.forEach(el => {
      const entry: Element = {
        repo_linked: false,
        repo_name: el.full_name
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

}
