import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  /**
   * On changing of route, scroll to top
   */
  onActivate() {
    window.scrollTo(0, 0);
  }
}
