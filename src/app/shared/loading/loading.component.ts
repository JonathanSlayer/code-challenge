import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  standalone: true,
  imports: [NzSpinModule]
})
export class LoadingComponent {
  constructor() {
  }
}
