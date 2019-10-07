import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the ProtoFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'proto-footer',
  templateUrl: 'proto-footer.html'
})
export class ProtoFooterComponent {

  @Input() title = '';
  @Input() buttonText;
  @Output() buttonPressed = new EventEmitter();

  emit(): void {
    this.buttonPressed.emit();
  }

}
