import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
})
export class LeftMenuComponent implements OnInit {
  activeclass1: string;
  activeclass2: string;
  activeclass3: string;
  activeclass4: string;
  activeclass5: string;
  activeclass6: string;

  constructor() { }

  ngOnInit() {
    /**
     * Commented Because throwing following error on bill of material page
     * ERROR TypeError: Cannot read property 'addEventListener' of null
     */
    /*document.getElementById('slideMenu').addEventListener('click', function () {
      var element = document.getElementsByClassName('left-menu-box')[0];
      element.classList.toggle("mystyle");
    });*/
  }

}
