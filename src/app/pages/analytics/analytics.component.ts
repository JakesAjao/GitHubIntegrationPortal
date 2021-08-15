import { Component, OnInit } from '@angular/core';

import { LogService } from 'app/services/log.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  navLinks = [    
    {
      path: '/analytics/committers',
      label: 'ListCommitters'
    },
    {
      path: '/analytics/insights',
      label: 'Insights'
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
