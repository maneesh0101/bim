import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'notification-Widget',
    templateUrl: 'notificationWidget.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class NotificationWidgetComponent implements OnInit {
    items: Array<any>;
    constructor(private router: Router) { }
    ngOnInit() {
        this.items = [{
            "SelectedRules": "Change Default User Group Priority",
            "Notifications": "100% for Internet",
            "color": "green"
        },

        {
            "SelectedRules": "Change Default App Priority",
            "Notifications": "100% Todays Capacity Internet",
            "color": "orange"
        },
        {
            "SelectedRules": "Request Add Capacity/Buy Capacity",
            "Notifications": "180% Billing Period Capacity ",
            "color": "yellow"
        },
        {
            "SelectedRules": "Restrict Users Group(X) Apps Use Rights",
            "Notifications": "90% for Voice",
            "color": "green"
        },
        {
            "SelectedRules": "Change Default User Group Priority",
            "Notifications": "150% for Wifi",
            "color": "green"
        }

        ]
    }
}
