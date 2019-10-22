import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'homepage.component.html',
    styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
    model: any = {};
    vsAccordian: any = {accr1:false,accr2:true,accr3:true};

    constructor(private router: Router) {
    }

    ngOnInit() {
    }
}
