import { Component } from '@angular/core';

@Component({
  selector: 'app-home-linkedin',
  templateUrl: './home-linkedin.component.html',
  styleUrls: ['./home-linkedin.component.scss']
})
export class HomeLinkedinComponent {
  IsShowen :boolean = false;

  showComment(): void {
    this.IsShowen = !this.IsShowen;
  }
}
