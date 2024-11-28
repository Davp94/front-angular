import { Component } from '@angular/core';
import { LayoutService } from '../../../../core/service/layout.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(public layoutService: LayoutService) { }
}