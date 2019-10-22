import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../../services/index';

@Component({
    templateUrl: 'signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [AuthenticationService]
})

export class SignInComponent implements OnInit {
    model: any = {};
    loading: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        
        var currentUser = {
            username: this.model.username,
            email: this.model.username
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigate(['/homepage']);
    
        /*this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password).subscribe(response => {
            if (response.result == 'success') {
                var currentUser = {
                    username: response.data.customerAccountName,
                    email: response.data.customerEmailId
                };
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.router.navigate(['/homepage']);
            } else {
                this.alertService.error(response.data);
            }
            this.loading = false;
        },
            error => {
                var errorMessage = JSON.parse(error['_body'])['data'];
                this.alertService.error(errorMessage);
                this.loading = false;
            });*/
    }
}
