import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class FooterService {
  showFooter$: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor() { }

}
