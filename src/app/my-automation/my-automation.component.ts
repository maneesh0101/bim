import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MyAutomationService, AlertService } from "../services/index";

@Component({
    templateUrl: 'my-automation.component.html',
    styleUrls: ['./my-automation.component.css'],
    providers: [MyAutomationService],
})

export class MyAutomationComponent implements OnInit {
    model: any = { 'policies': {}, 'criteria': [], 'operation': [], 'attribute': [], 'subCriteria': [] };
    policyData: any;
    seletectPolicyfamily: string = "SDWAN";
    selectedCoManagePolicy: any = { 'family': '', 'policies': [] };
    listSelectedPolicy: any = { 'family': '', 'policies': [] };
    openSubCriteria: any;
    openTest: any;

    operations: any = [];
    attributes: any = [];
    //attributes: any = ["Bandwidth", "Capacity", "Todays Capacity", "Bill-to-Period Capacity"];
    subCriterias: any = [];

    formFieldArray: any;
    invoiceForm: FormGroup;
    
    constructor(private _fb: FormBuilder, private router: Router, private myAutomationService: MyAutomationService, private alertService: AlertService) { }

    ngOnInit() {
        this.model.mySolution = 0;
        this.model.category = 0;
        this.model.device = 0;

        this.myAutomationService.getPolicies().subscribe(data => {
            if (data) {
                this.policyData = data.data;
                this.clickPolicyfamily(this.seletectPolicyfamily);

                for (let family of this.policyData) {
                    this.model.criteria[family.family] = [];
                    this.model.operation[family.family] = [];
                    this.model.attribute[family.family] = [];
                    this.model.subCriteria[family.family] = [];
                    this.operations[family.family] = [];
                    this.attributes[family.family] = [];
                    this.subCriterias[family.family] = [];

                    for (let policy of family.policies) {
                        this.formFieldArray[policy.policy] = [];
                        this.model.criteria[family.family][policy.policy] = [];
                        this.model.operation[family.family][policy.policy] = [];
                        this.model.attribute[family.family][policy.policy] = [];
                        this.model.subCriteria[family.family][policy.policy] = [];
                        this.operations[family.family][policy.policy] = [];
                        this.attributes[family.family][policy.policy] = [];
                        this.subCriterias[family.family][policy.policy] = [];

                        if (policy.configuration) {
                            for (let config of policy.configuration) {
                                this.model.criteria[family.family][policy.policy][config.name] = [];
                                this.model.operation[family.family][policy.policy][config.name] = [];
                                this.model.attribute[family.family][policy.policy][config.name] = [];
                                this.model.subCriteria[family.family][policy.policy][config.name] = [];
                                this.operations[family.family][policy.policy][config.name] = [];
                                this.attributes[family.family][policy.policy][config.name] = [];
                                this.subCriterias[family.family][policy.policy][config.name] = [];
                            }
                        }
                    }
                    //break;
                }
            }
        }, error => {
            this.alertService.error(error);
        });

        // this.invoiceForm = this._fb.group({
        //     itemRows: this._fb.array([this.initItemRows()])
        // });
        
        this.invoiceForm = this._fb.group({
            itemRows: this._fb.array([this.initItemRows()])
        });

        this.formFieldArray = {test:this.invoiceForm};
        console.log(this.formFieldArray);
    }
    initItemRows() {
        console.log(this.formFieldArray);
        return this._fb.group({
            // list all your form controls here, which belongs to your form array
            criterias: [''],
            operations: [''],
            attributes: new FormControl({value: '', disabled: false}),
            subCriterias: ['']
        });
    }
    addNewRow() {
        // control refers to your formarray
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        // add new formgroup
        control.push(this.initItemRows());
    }
    
    deleteRow(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.invoiceForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
    }

    clickPolicyfamily(family) {
        this.seletectPolicyfamily = family;

        var data = this.policyData;
        var index = data.map(function (d) { return d['family']; }).indexOf(family);
        this.selectedCoManagePolicy = { 'family': this.policyData[index].family, 'policies': this.policyData[index].policies };
        this.model.policies = {};
        this.listSelectedPolicy = { 'family': this.policyData[index].family, 'policies': [] };
        for (let cmpl of this.selectedCoManagePolicy.policies) {
            if (cmpl.enabled == "true") {
                this.model.policies[cmpl.policy] = true;
                this.listSelectedPolicy.policies.push(cmpl);
            }
        }
    }

    selectPolicies(e, policyJson) {
        if (e.target.checked == true) {
            this.listSelectedPolicy.policies.push(policyJson);
        } else {
            this.removePolicies(policyJson);
        }
    }

    removePolicies(policyJson) {
        var index = this.listSelectedPolicy.policies.indexOf(policyJson);
        this.listSelectedPolicy.policies.splice(index, 1);
        this.model.policies[policyJson.policy] = false;
    }

    openTestBox(policy) {
        this.openTest = policy;
        this.openSubCriteria = '';
    }

    closeTestBox(policy) {
        this.openTest = '';
    }

    openSubCriteriaBox(policy) {
        this.openTest = '';
        this.openSubCriteria = policy;
    }

    closeSubCriteriaBox(policy) {
        this.openSubCriteria = '';
    }

    selectCriteria(policy) {
        for (let policyJson of this.listSelectedPolicy.policies) {
            if (policyJson.policy == policy) {
                var selectedCriteria = this.model.criteria[this.listSelectedPolicy.family][policy];

                //blank attribute dropdown and subcriteria checkboxes
                this.operations[this.listSelectedPolicy.family][policy][selectedCriteria] = [];
                this.attributes[this.listSelectedPolicy.family][policy][selectedCriteria] = [];
                this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria] = [];

                var index = policyJson.configuration.map(function (d) { return d['name']; }).indexOf(selectedCriteria);
                this.operations[this.listSelectedPolicy.family][policy][selectedCriteria] = policyJson.configuration[index]['operations'];
            }
        }
    }

    selectOperation(policy) {
        var selectedCriteria = this.model.criteria[this.listSelectedPolicy.family][policy];

        //blank attribute dropdown and subcriteria checkboxes
        this.attributes[this.listSelectedPolicy.family][policy][selectedCriteria] = [];
        this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria] = [];

        var index = this.operations[this.listSelectedPolicy.family][policy][selectedCriteria].map(function (d) {
            return d['value'];
        }).indexOf(this.model.operation[this.listSelectedPolicy.family][policy]);

        if (this.operations[this.listSelectedPolicy.family][policy][selectedCriteria][index]['params']) {
            this.attributes[this.listSelectedPolicy.family][policy][selectedCriteria] = this.operations[this.listSelectedPolicy.family][policy][selectedCriteria][index]['params'];
        } else {
            this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria] = this.operations[this.listSelectedPolicy.family][policy][selectedCriteria][index]['apps'];

            let inx = 0;
            for (let i of this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria]) {
                this.model.subCriteria[this.listSelectedPolicy.family][policy][inx] = true;
                inx++;
            }
        }

    }

    selectAttribute(policy) {
        var selectedCriteria = this.model.criteria[this.listSelectedPolicy.family][policy];

        //blank subcriteria checkboxes
        this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria] = [];

        var index = this.attributes[this.listSelectedPolicy.family][policy][selectedCriteria].map(function (d) {
            return d['paramName'];
        }).indexOf(this.model.attribute[this.listSelectedPolicy.family][policy]);

        this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria] = this.attributes[this.listSelectedPolicy.family][policy][selectedCriteria][index]['apps'];
        let inx = 0;
        for (let i of this.subCriterias[this.listSelectedPolicy.family][policy][selectedCriteria]) {
            this.model.subCriteria[this.listSelectedPolicy.family][policy][inx] = true;
            inx++;
        }


    }

}
