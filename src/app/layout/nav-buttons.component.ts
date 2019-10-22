import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-buttons',
  inputs: ['step'],
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.css']
})
export class NavButtonsComponent implements OnInit {
  @Input() step: any;
  hoverStep1:boolean=false;
  hoverStep2:boolean=false;
  hoverStep3:boolean=false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if(this.step=="step2") {
      this.hoverStep1=true;
      this.hoverStep2=true;
    }else if(this.step=="step3") {
      this.hoverStep1=false;
      this.hoverStep2=false;
      this.hoverStep3=true;
    }
  }

  goto(goToStep) {
    if(this.step=="step1") {
      return false;
    }
    if( (this.step=="step2") && goToStep=='step1') {
      this.router.navigate(['/step-01']);
      return false;
    }
    if(this.step=="step3" && goToStep=='step1') {
      return false;
    }
    if(this.step=="step3") {
      return false;
    }
  }

}
