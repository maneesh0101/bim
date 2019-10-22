import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BuildMySolutionService, AlertService } from '../services/index';
import { AgreeBmsPlaceOrderOverlayComponent } from '../widgets/index';

@Component({
  templateUrl: 'bms-place-order.component.html',
  styleUrls: ['./bms-place-order.css']
})

export class BmsPlaceOrderComponent implements OnInit {

  public invoiceForm: FormGroup;
  model: any = {};
  stepNumber: string = '3';
  bomData: any;
  bomTemplate: string = 'T01';
  bomTemplateData: any;
  accName: any;

  settings = {
    columns: {
      Product: {
        title: 'Product'
      },
      Quantity: {
        title: 'Quantity'
      },
      Name: {
        title: 'Name'
      },
      Address: {
        title: 'Address'
      },
      City: {
        title: 'City'
      },
      State: {
        title: 'State'
      },
      Zipcode: {
        title: 'Zipcode'
      },
      Country: {
        title: 'Country'
      }
    }
  };

  constructor(private _fb: FormBuilder, private router: Router, private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) {
  }

  ngOnInit() {
    var template = sessionStorage.getItem('bomTemplate');
    if (template) {
      this.bomTemplate = template;
      this.bomTemplateData = JSON.parse(sessionStorage.getItem('bomTemplateData'));
    }

    this.buildMySolutionService.getPlaceOrder().subscribe(data => {
      if (data) {
        var jsonMomData = Array.of(data);
        this.bomData = jsonMomData[0];
        this.accName = this.bomData[0].accountName;
      }
    }, error => {
      this.alertService.error(error);
    });
  }
}
