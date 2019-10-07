import { Component, OnDestroy } from '@angular/core';
import { NavController, ActionSheetController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  devices: Array<Device> = [];
  pollingData: any;

  constructor(public navCtrl: NavController,
    private serviceProvider: ServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController) {
    this.pollingData = Observable.interval(10000).subscribe(() => {
      this.getSelectedDevices();
    });
  }

  ionViewWillEnter() {
    this.getSelectedDevices();
  }

  ngOnDestroy() {
    this.pollingData.unsubscribe();
  }

  getSelectedDevices() {
    this.serviceProvider.getSelectedDevices().subscribe((data) => {
      this.devices = data['objects'];
    })
  }

  getDotClass(timeString: string): string {
    const timeDifference = this.calculateTimeDifferenceFromNow(timeString);
    const minutes = timeDifference.asMinutes();
    if (minutes <= 1) {
      return 'dot-green';
    } else if (minutes <= 5) {
      return 'dot-yellow';
    } else {
      return 'dot-red';
    }
  }

  calculateTimeDifferenceFromNow(timeString: string): moment.Duration {
    const start = moment(timeString);
    const now = moment(new Date());
    return moment.duration(now.diff(start));
  }

  presentActionSheet(clickedDevice: Device) {

    const buttons = [
      {
        text: 'Addresse kopieren',
        handler: () => {
          navigator['clipboard'].writeText(clickedDevice.hostname).then(() => {
            this.presentToast('Addresse wurde kopiert');
          }, function (err) {
            console.error('Async: Could not copy text: ', err);
          });
        }
      },
      {
        text: 'Abbrechen',
        role: 'cancel'
      }
    ];

    if (clickedDevice.device_class === 'Kommissioniercontainer' ||
      clickedDevice.device_class === 'Beschlaegeturm') {
      buttons.push({
        text: 'Aufleuchten lassen',
        handler: () => {
          console.log('Aufleuchten clicked');
        }
      });
    }

    const actionSheet = this.actionSheetCtrl.create({
      title: clickedDevice.name,
      buttons: buttons
    });
    actionSheet.present();
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
