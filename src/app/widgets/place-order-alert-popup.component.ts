import { Component, OnInit, TemplateRef,Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'place-order-alert-popup',
  templateUrl: './place-order-alert-popup.component.html',
})
export class PlaceOrderAlertPopup implements OnInit {
  @Input() enablePlaceOrderContinue: any;
  modalRef: BsModalRef;
  model:any={};
  
  constructor(private modalService: BsModalService,private router: Router) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  save() {
    this.router.navigate(['/build-my-solution/track-order']);
  }   
}
