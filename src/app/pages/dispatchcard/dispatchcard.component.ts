import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-dispatchcard',
  templateUrl: './dispatchcard.component.html',
  styleUrls: ['./dispatchcard.component.css']
})
export class DispatchcardComponent implements OnInit {
 
  navLinks = [
    // {
    //   path: '/creditcard/cardupload',
    //   label: 'Cardupload'
    // },
    {
      path: '/creditcard/acknowledge',
      label: 'Search'
    },
    {
      path: '/creditcard/pickup',
      label: 'Pickup'
    },
    {
      path: '/creditcard/activate',
      label: 'Activate'
    },
    ];
  constructor() {
 
   }

  ngOnInit(): void {
  }

}
