import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bms-nav-buttons',
  inputs: ['step', 'stepNumber'],
  templateUrl: './bms-nav-buttons.component.html',
  styleUrls: ['./bms-nav-buttons.component.css']
})
export class BmsNavButtonsComponent implements OnInit {
  @Input() stepNumber: any;
  hoverStep1: boolean = false;
  hoverStep2: boolean = false;
  hoverStep3: boolean = false;
  hoverStep4: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.stepNumber == "2") {
      this.hoverStep1 = true;
    } else if (this.stepNumber == "3") {
      this.hoverStep1 = true;
      this.hoverStep2 = true;
    }
  }

  goto(goToStepNumber) {
    if (this.stepNumber == "1") {
      return false;
    }
    if ((this.stepNumber == "2" || this.stepNumber == "3") && goToStepNumber == '1') {
      this.router.navigate(['/build-my-solution']);
      return false;
    }
    if ((this.stepNumber == "3") && goToStepNumber == '2') {
      this.router.navigate(['/build-my-solution/bill-of-material']);
      return false;
    }
    if (this.stepNumber == "4") {
      return false;
    }
  }
}
