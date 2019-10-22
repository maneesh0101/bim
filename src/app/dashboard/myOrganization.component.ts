import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from "@angular/http";
import { MyConsoleService, AlertService } from '../services/index';
import * as _ from 'lodash';

@Component({
    selector: 'myOrganization-Widget',
    templateUrl: 'myOrganization.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class MyOrganizationComponent implements OnInit {
    public data;
    success:boolean=false;
    successMsg ="";
    sentInviteData = {};
    public selectedAll;
    public filterQuery = "";

    public sortBy = "email";
    public sortOrder = "asc";
    selectedEntities: any[];
    Role: any;

    constructor(private http: Http,private myConsoleService: MyConsoleService) { }
    ngOnInit(): void {
        this.http.get("assets/json/demo.json")
            .subscribe((data) => {
                setTimeout(() => {
                    this.data = data.json();
                }, 1000);
            });
    }

    public toInt(num: string) {
        return +num;
    }
    public sortByWordLength = (a: any) => {
        return a.city.length;
    }
    public removeItem(item: any) {
        this.data = _.filter(this.data, (elem) => elem != item);
    }
    public addRow() {
        this.data.push({
            "ID": "VZ000" + Math.floor((Math.random() * 100) + 1),
            "Name": "Name",
            "Role": ["Administrator", "Business Analyst"]
        })
    }
    public checkIfAllSelected() {
        var self = this;
        this.selectedAll = this.data.every(function (item: any) {
            return self.data.selected == true;
        })
    }
    public selectAll() {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].selected = this.selectedAll;
        }
    }
    // public sendInvite() {
    //     this.success=true;
       
    //     this.successMsg = "successfull!";
    // }
    sendInvite() {
        this.success=true;
        this.successMsg = "successfull!";
        this.sentInviteData=[{'email':'test1','name':'one'},{'email':'test2','name':'two'}];
        
       this.myConsoleService.getsendInviteData(this.sentInviteData).subscribe(data => {
            
             if (data.result == 'success') {
               
                this.successMsg = "successfull!";
                
            } else {
               this.successMsg = "Error!";
            }
            }, error => {
          //this.alertService.error(error);
      })
    }

}
