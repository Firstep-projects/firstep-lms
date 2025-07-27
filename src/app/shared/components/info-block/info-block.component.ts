import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-block',
  imports: [],
  templateUrl: './info-block.component.html',
  styleUrl: './info-block.component.css'
})
export class InfoBlockComponent {
  @Input() label: string = "";
  @Input() iconLink: string = "";
  @Input() styleClass: string = "";

}
