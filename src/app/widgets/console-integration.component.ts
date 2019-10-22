import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'console-integration-modal-widget',
  templateUrl: './console-integration-modal-widget.html',
})
export class ConsoleIntegrationComponent implements OnInit {
  modalRef: BsModalRef;
  vsAccordian: any = { accr1: true, accr2: true, accr3: true };
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openIntegrationModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}