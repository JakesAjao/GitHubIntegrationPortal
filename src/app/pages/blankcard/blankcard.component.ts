import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-blankcard',
  templateUrl: './blankcard.component.html',
  styleUrls: ['./blankcard.component.css']
})
export class BlankcardComponent implements OnInit {

  navLinks = [
    // {
    //   path: '/blankcard/cardupload',
    //   label: 'Cardupload'
    // },
    {
      path: '/blankcard/acknowledge',
      label: 'Acknowledge'
    },
    
    ];
  constructor() { 
   }

  ngOnInit(): void {
  }

}
