import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';

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
  constructor(private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(60).subscribe((res) => {
      if(res) {
          console.log("session expired");
      }
    })
   }

  ngOnInit(): void {
  }

}
