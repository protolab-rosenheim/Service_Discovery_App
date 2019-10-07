import { Component, Input } from '@angular/core';

/**
 * Generated class for the DeviceBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'device-box',
  templateUrl: 'device-box.html'
})
export class DeviceBoxComponent {

  @Input() device: Device;
  @Input() dotType: string = "";

  imagePath = {
    'container': 'assets/icon/container.svg',
    'flatwaggon': 'assets/icon/flatwaggon.svg',
    'saw': 'assets/icon/Saege.svg',
    'edge': 'assets/icon/KAM.svg',
    'assembly': 'assets/icon/Montage.svg',
    'shredder': 'assets/icon/Schredder.svg',
    'chute_config': 'assets/icon/Konfigurator.svg',
    'drill': 'assets/icon/Bohren_Fraesen.svg'
  }

  getImage(device): string {
    return this.imagePath[device['device_class']]
  }

  constructor() {
  }

}
