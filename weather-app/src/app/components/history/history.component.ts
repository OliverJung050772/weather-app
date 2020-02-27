import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dataSourceName: string;
  title: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSourceName = this.route.snapshot.params.name;
    this.title = this.dataSourceName + '-history';
  }

}
