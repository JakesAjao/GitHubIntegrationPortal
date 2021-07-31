import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  navLinks = [    
    {
      path: '/analytics/committers',
      label: 'CommitterList'
    },
    {
      path: '/analytics/commit',
      label: 'Commit'
    }
    // {
    //   path: '/creditcard/pickup',
    //   label: 'Pickup'
    // },
    // {
    //   path: '/creditcard/activate',
    //   label: 'Activate'
    // },
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
