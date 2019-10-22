import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'alerts-Widget',
    templateUrl: 'alertsWidget.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class AlertsWidgetComponent implements OnInit {
    errordata = [{
            "Success": "Order delivery delayed by 2 days",
            "step":"step2"
             },
            {
            "Success": "SDWAN installation failed",
            "step":"step2"
            },
            {
            "Success": "WiFI uCPE commissioning failed",
            "step":"step2"
            },
            {
              "Success": "Co-related service impact for SFDC",
              "step":"step1"
            },
            {
              "Success": "Primary access unavailable for Ashburn branch",
              "step":"step1"
            },
          
    ]
    constructor(private router: Router) {}

    ngOnInit() {}
}
