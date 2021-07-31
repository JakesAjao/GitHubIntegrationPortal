import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-committer',
  templateUrl: './committer.component.html',
  styleUrls: ['./committer.component.scss']
})
export class CommitterComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    console.log(this.activatedRoute.snapshot.params.id);
  }

}
