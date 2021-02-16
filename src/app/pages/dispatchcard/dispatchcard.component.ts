import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatchcard',
  templateUrl: './dispatchcard.component.html',
  styleUrls: ['./dispatchcard.component.css']
})
export class DispatchcardComponent implements OnInit {
 
  navLinks = [
    {
      path: '/dispatchcard/acknowledge',
      label: 'Acknowledge'
    },
    {
      path: '/dispatchcard/pickup',
      label: 'Pickup'
    },
    {
      path: '/dispatchcard/activate',
      label: 'Activate'
    },
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
