import { Component } from '@angular/core';
import { FooterService } from "../../services/footer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  year: number;
  show: boolean = true;

  constructor(public service: FooterService) {
    let date = new Date()
    this.year = date.getFullYear();

    this.service.showFooter$.subscribe(b => { if (b !== null || b !== undefined) this.show = b})
  }

}
