import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-modal-radio-streaming',
  templateUrl: './modal-radio-streaming.component.html',
  styleUrls: ['./modal-radio-streaming.component.scss'],
})
export class ModalRadioStreamingComponent {

  streamUrl = 'http://24363.live.streamtheworld.com:3690/XEPHAM_SC';
  audio: HTMLAudioElement | null = null;

  constructor(private modalController: ModalController) {}

  playRadio() {
    if (Capacitor.isNativePlatform()) {
      // Optionally use Capacitor Media plugin
      console.log('Media plugin can be configured here');
    } else {
      // Use HTML5 audio for browser
      if (!this.audio) {
        this.audio = new Audio(this.streamUrl);
        this.audio.play();
      }
    }
  }

  stopRadio() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  closeModal() {
    this.stopRadio();
    this.modalController.dismiss();
  }

}
