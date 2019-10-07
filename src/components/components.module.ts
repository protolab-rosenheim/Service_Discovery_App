import { NgModule } from '@angular/core';
import { ProtoHeaderComponent } from './proto-header/proto-header';
import { ProtoFooterComponent } from './proto-footer/proto-footer';
import { IonicModule } from 'ionic-angular';
import { DeviceBoxComponent } from './device-box/device-box';
@NgModule({
	declarations: [ProtoHeaderComponent,
    ProtoFooterComponent,
    DeviceBoxComponent],
	imports: [IonicModule],
	exports: [ProtoHeaderComponent,
    ProtoFooterComponent,
    DeviceBoxComponent]
})
export class ComponentsModule {}
